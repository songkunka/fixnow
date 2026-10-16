#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
KKU Business Plan Report Generator for FixNow Grant Application (Executive Academic Edition)
- Standard: KKU Academic Report / International Grant Proposal Standard (/KKUReport)
- Clean, executive prose with NO AI-meta disclaimers or raw copy-paste clutter
- Academic Three-Line Tables (ตารางแบบ 3 เส้นตามมาตรฐานสากล: ไม่มีพื้นหลังสีฟ้า ไม่มีเส้นตั้ง)
- NO colored callout boxes (กล่องข้อความขอบน้ำเงินถูกยกเลิก เขียนเป็นความเรียงวิชาการเชิงบริหาร)
- Complete Front Matter: ปก มข. + ตราสัญลักษณ์, คำนำ, สารบัญเนื้อหา, สารบัญตาราง, คำอธิบายคำย่อ
- 10 Complete Chapters + References
- Typography: TH SarabunPSK across all XML attributes (ascii, hAnsi, cs, eastAsia)
- PyThaiNLP Zero-Width Space (ZWS) Thai word boundary line-breaking
- Margins: Left 3.18 cm (binding), Right/Top/Bottom 2.54 cm
- Section breaks: Cover (None), Preface (ก), TOC (ข), List of Tables (ค), Abbreviations (ง), Body (1, 2, 3...)
"""

import os
import re
import sys
import docx
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import qn, nsdecls

FONT = "TH SarabunPSK"
ZWS = "\u200B"

# --- Thai line-breaking engine ---
_THAI_PATTERN = re.compile(r"([฀-๿]+)")

def insert_zwsp(text: str, engine: str = "newmm") -> str:
    text = str(text)
    try:
        from pythainlp import word_tokenize
        parts = _THAI_PATTERN.split(text)
        result = []
        for part in parts:
            if _THAI_PATTERN.fullmatch(part):
                tokens = word_tokenize(part, engine=engine)
                result.append(ZWS.join(tokens))
            else:
                result.append(part)
        return "".join(result)
    except Exception:
        return text

def z(t: str) -> str:
    return insert_zwsp(t)

# --- Typography & Formatting Helpers ---

def set_run_font(run, size=16, bold=False, italic=False, color_rgb=None):
    # Enforce strictly 16 pt everywhere as requested by user ("ขนาด 16 ทั้งหมด ห้ามเล็กหรือใหญ่กว่านี้ทุกกรณี")
    size = 16
    run.font.name = FONT
    run.font.size = Pt(16)
    run.font.bold = bold
    run.font.italic = italic
    if color_rgb:
        run.font.color.rgb = color_rgb
    rPr = run._r.get_or_add_rPr()
    rFonts = OxmlElement('w:rFonts')
    for attr in ('w:ascii', 'w:hAnsi', 'w:cs', 'w:eastAsia'):
        rFonts.set(qn(attr), FONT)
    ex = rPr.find(qn('w:rFonts'))
    if ex is not None:
        rPr.remove(ex)
    rPr.insert(0, rFonts)
    for sz_attr in ('w:sz', 'w:szCs'):
        sz_el = rPr.find(qn(sz_attr))
        if sz_el is None:
            sz_el = OxmlElement(sz_attr)
            rPr.append(sz_el)
        sz_el.set(qn('w:val'), '32')

def set_para_format(para, align=WD_ALIGN_PARAGRAPH.LEFT,
                     space_before=0, space_after=6, line_spacing=1.5):
    pf = para.paragraph_format
    pf.alignment = align
    pf.space_before = Pt(space_before)
    pf.space_after = Pt(space_after)
    pf.line_spacing = Pt(16 * line_spacing)

def add_section_break(doc, break_type='nextPage'):
    para = doc.add_paragraph()
    pPr = para._p.get_or_add_pPr()
    sectPr = OxmlElement('w:sectPr')
    pgSz = OxmlElement('w:pgSz')
    pgSz.set(qn('w:w'), '11906')
    pgSz.set(qn('w:h'), '16838')
    sectPr.append(pgSz)
    pgMar = OxmlElement('w:pgMar')
    for k, v in [('w:top', '1440'), ('w:right', '1440'), ('w:bottom', '1440'), ('w:left', '1803')]:
        pgMar.set(qn(k), v)
    sectPr.append(pgMar)
    brk = OxmlElement('w:type')
    brk.set(qn('w:val'), break_type)
    sectPr.insert(0, brk)
    pPr.append(sectPr)

def _clear_header(section):
    h = section.header
    h.is_linked_to_previous = False
    for p in list(h.paragraphs):
        p._p.getparent().remove(p._p)
    return h

def set_header_static(section, text):
    h = _clear_header(section)
    p = h.add_paragraph()
    set_para_format(p, align=WD_ALIGN_PARAGRAPH.RIGHT, space_before=0, space_after=0, line_spacing=1.0)
    set_run_font(p.add_run(text), size=14)

def set_header_page_number(section):
    h = _clear_header(section)
    p = h.add_paragraph()
    set_para_format(p, align=WD_ALIGN_PARAGRAPH.RIGHT, space_before=0, space_after=0, line_spacing=1.0)
    run = p.add_run()
    set_run_font(run, size=14)
    f1 = OxmlElement('w:fldChar'); f1.set(qn('w:fldCharType'), 'begin')
    ins = OxmlElement('w:instrText'); ins.text = 'PAGE'
    f2 = OxmlElement('w:fldChar'); f2.set(qn('w:fldCharType'), 'separate')
    f3 = OxmlElement('w:fldChar'); f3.set(qn('w:fldCharType'), 'end')
    run._r.extend([f1, ins, f2, f3])

def restart_page_number(section, start=1):
    sP = section._sectPr
    ex = sP.find(qn('w:pgNumType'))
    if ex is not None:
        sP.remove(ex)
    n = OxmlElement('w:pgNumType')
    n.set(qn('w:start'), str(start))
    sP.append(n)

def page_break_para(doc):
    p = doc.add_paragraph()
    r = p.add_run()
    br = OxmlElement('w:br')
    br.set(qn('w:type'), 'page')
    r._r.append(br)

def cover_line(doc, text, size=16, bold=False, space_after=4):
    p = doc.add_paragraph()
    set_para_format(p, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=space_after, line_spacing=1.5)
    set_run_font(p.add_run(z(text)), size=size, bold=bold)

def chapter_heading(doc, number, title):
    p1 = doc.add_paragraph()
    set_para_format(p1, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=2, line_spacing=1.5)
    set_run_font(p1.add_run(z(f"บทที่ {number}")), size=20, bold=True)

    p2 = doc.add_paragraph()
    set_para_format(p2, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=12, line_spacing=1.5)
    set_run_font(p2.add_run(z(title)), size=20, bold=True)

def section_heading(doc, title):
    p = doc.add_paragraph()
    set_para_format(p, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=10, space_after=4, line_spacing=1.5)
    set_run_font(p.add_run(z(title)), size=16, bold=True)

def subsection_heading(doc, title):
    p = doc.add_paragraph()
    set_para_format(p, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=6, space_after=2, line_spacing=1.5)
    p.paragraph_format.left_indent = Cm(0.63)
    set_run_font(p.add_run(z(title)), size=16, bold=True)

def body_para(doc, text, indent=True):
    p = doc.add_paragraph()
    set_para_format(p, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=0, space_after=4, line_spacing=1.5)
    if indent:
        p.paragraph_format.first_line_indent = Cm(1.27)
    set_run_font(p.add_run(z(text)), size=16)

def bullet_para(doc, text):
    p = doc.add_paragraph()
    set_para_format(p, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=0, space_after=3, line_spacing=1.5)
    p.paragraph_format.left_indent = Cm(1.27)
    p.paragraph_format.first_line_indent = Cm(-0.63)
    set_run_font(p.add_run(z(text)), size=16)

def toc_row(doc, title, page, is_sub=False):
    p = doc.add_paragraph()
    set_para_format(p, space_before=0, space_after=2, line_spacing=1.5)
    pPr = p._p.get_or_add_pPr()
    tabs = OxmlElement('w:tabs')
    tab = OxmlElement('w:tab')
    tab.set(qn('w:val'), 'right')
    tab.set(qn('w:leader'), 'dot')
    tab.set(qn('w:pos'), '8640')
    tabs.append(tab)
    pPr.append(tabs)
    if is_sub:
        p.paragraph_format.left_indent = Cm(1.27)
    set_run_font(p.add_run(z(title)), size=16, bold=not is_sub)
    set_run_font(p.add_run(f"\t{page}"), size=16)

# --- Standard Academic Three-Line Table Generator (ตาราง 3 เส้นสากล) ---

def add_academic_table(doc, table_num, title, headers, rows, col_widths, note=None):
    """
    สร้างตารางวิชาการตามมาตรฐานสากล (Three-line table):
    - หัวตารางมีชื่อตารางชิดซ้าย (ตารางที่ X.X ชื่อตาราง)
    - เส้นบนสุดหนา (1.0pt) เส้นใต้หัวตารางบาง (0.5pt) เส้นปิดท้ายหนา (1.0pt)
    - ไม่มีเส้นตั้ง (No vertical borders)
    - ไม่มีสีพื้นหลังทึบ/สีฟ้า (Transparent/White background)
    - มีหมายเหตุท้ายตารางหากระบุ
    """
    # 1. Table Caption (ชื่อตาราง)
    p_cap = doc.add_paragraph()
    set_para_format(p_cap, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=8, space_after=3, line_spacing=1.3)
    r_cap_num = p_cap.add_run(z(f"ตารางที่ {table_num} "))
    set_run_font(r_cap_num, size=15, bold=True)
    r_cap_title = p_cap.add_run(z(title))
    set_run_font(r_cap_title, size=15, bold=False)

    num_cols = len(headers)
    table = doc.add_table(rows=len(rows) + 1, cols=num_cols)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER

    tblPr = table._tbl.tblPr

    # Borders: Top 1.0pt (sz 8), Bottom 1.0pt (sz 8), no vertical, no inside horizontal
    borders = parse_xml(r'''<w:tblBorders %s>
        <w:top w:val="single" w:sz="8" w:space="0" w:color="000000"/>
        <w:bottom w:val="single" w:sz="8" w:space="0" w:color="000000"/>
        <w:left w:val="none"/>
        <w:right w:val="none"/>
        <w:insideH w:val="none"/>
        <w:insideV w:val="none"/>
    </w:tblBorders>''' % nsdecls('w'))
    tblPr.append(borders)

    # Padding
    tblCellMar = parse_xml(r'''<w:tblCellMar %s>
        <w:top w:w="80" w:type="dxa"/>
        <w:bottom w:w="80" w:type="dxa"/>
        <w:left w:w="120" w:type="dxa"/>
        <w:right w:w="120" w:type="dxa"/>
    </w:tblCellMar>''' % nsdecls('w'))
    tblPr.append(tblCellMar)

    # Header Row
    hdr_row = table.rows[0]
    hdr_trPr = hdr_row._tr.get_or_add_trPr()
    hdr_trPr.append(parse_xml(r'<w:tblHeader %s/>' % nsdecls('w')))
    hdr_trPr.append(parse_xml(r'<w:cantSplit %s/>' % nsdecls('w')))

    for c_idx, h_text in enumerate(headers):
        cell = hdr_row.cells[c_idx]
        cell.text = ""
        # Add bottom border 0.5pt (sz 4) to header cells to create the middle line!
        tcPr = cell._tc.get_or_add_tcPr()
        tcBorders = parse_xml(r'''<w:tcBorders %s>
            <w:bottom w:val="single" w:sz="4" w:space="0" w:color="000000"/>
        </w:tcBorders>''' % nsdecls('w'))
        tcPr.append(tcBorders)

        p = cell.paragraphs[0]
        set_para_format(p, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=3, space_after=3, line_spacing=1.15)
        set_run_font(p.add_run(z(h_text)), size=14, bold=True)

    # Data Rows
    for r_idx, row_data in enumerate(rows):
        row = table.rows[r_idx + 1]
        trPr = row._tr.get_or_add_trPr()
        trPr.append(parse_xml(r'<w:cantSplit %s/>' % nsdecls('w')))

        for c_idx, val in enumerate(row_data):
            if c_idx >= num_cols:
                continue
            cell = row.cells[c_idx]
            cell.text = ""
            p = cell.paragraphs[0]
            val_str = str(val).strip()

            align = WD_ALIGN_PARAGRAPH.LEFT
            if c_idx == 0 and num_cols >= 4:
                align = WD_ALIGN_PARAGRAPH.CENTER
            elif len(val_str) <= 8 and (val_str.replace('.', '', 1).isdigit() or val_str.endswith('%')):
                align = WD_ALIGN_PARAGRAPH.CENTER

            set_para_format(p, align=align, space_before=2, space_after=2, line_spacing=1.15)
            set_run_font(p.add_run(z(val_str)), size=13.5, bold=False)

    # Set column widths strictly
    for r in table.rows:
        for c_idx, w in enumerate(col_widths):
            r.cells[c_idx].width = Cm(w)

    # Table Note
    if note:
        p_note = doc.add_paragraph()
        set_para_format(p_note, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=2, space_after=6, line_spacing=1.15)
        r_n1 = p_note.add_run(z("หมายเหตุ: "))
        set_run_font(r_n1, size=13, bold=True, italic=True)
        r_n2 = p_note.add_run(z(note))
        set_run_font(r_n2, size=13, bold=False, italic=True)
    else:
        p_spacer = doc.add_paragraph()
        set_para_format(p_spacer, space_before=0, space_after=4, line_spacing=1.0)


def generate_executive_report():
    output_file = r"c:\Users\WINDOWS\OneDrive\Desktop\fixnow\FixNow_Business_Plan_KKU_Grant_Proposal.docx"
    logo_file = r"C:\Users\WINDOWS\.gemini\config\skills\KKUReport\assets\kku_logo.png"

    print("Initializing executive document builder...")
    doc = Document()
    doc.styles['Normal'].font.name = FONT
    doc.styles['Normal'].font.size = Pt(16)

    # ══════════════════════════════════════════════════════════════════════════
    # SECTION 1: ปกรายงาน (Cover Page - KKU Academic Standard)
    # ══════════════════════════════════════════════════════════════════════════
    print("Building Cover Page...")
    if os.path.exists(logo_file):
        logo_p = doc.add_paragraph()
        logo_p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        logo_p.paragraph_format.space_before = Pt(0)
        logo_p.paragraph_format.space_after = Pt(6)
        logo_p.paragraph_format.line_spacing = None
        logo_p.add_run().add_picture(logo_file, width=Cm(2.13))

    doc.add_paragraph()
    cover_line(doc, "รายงานแผนธุรกิจเพื่อประกอบการพิจารณาเงินทุนสนับสนุน", size=16, bold=False, space_after=6)
    cover_line(doc, "โครงการ FixNow: แพลตฟอร์มตัวกลางบริการช่วยเหลือรถยนต์นอกสถานที่", size=16, bold=True, space_after=20)

    cover_line(doc, "จัดทำโดย", size=16, bold=True, space_after=6)
    members = [
        {"name": "นายวรพงษ์ ทินช่วย", "id": "673210855-6"},
        {"name": "นายวัสยศ ภูถาดถม", "id": "673210857-2"},
        {"name": "นายรัชชานนท์ ขันตี", "id": "673210853-0"},
        {"name": "นายชนาธิป ศรีประวงศ์", "id": "673210579-4"},
    ]
    for m in members:
        cover_line(doc, f"{m['name']}   รหัสนักศึกษา {m['id']}", size=16, bold=False, space_after=4)

    cover_line(doc, "", size=16, space_after=8)
    cover_line(doc, "เสนอ", size=16, bold=True, space_after=4)
    cover_line(doc, "คณะกรรมการพิจารณาเงินทุนสนับสนุน / อาจารย์ที่ปรึกษาโครงการ", size=16, bold=False, space_after=18)

    cover_line(doc, "มหาวิทยาลัยขอนแก่น", size=16, bold=False, space_after=4)
    cover_line(doc, "ภาคเรียนที่ 1 ปีการศึกษา 2569", size=16, bold=False, space_after=0)

    add_section_break(doc, 'nextPage')

    # ══════════════════════════════════════════════════════════════════════════
    # SECTION 2: คำนำ (Preface - Header "ก")
    # ══════════════════════════════════════════════════════════════════════════
    print("Building Preface...")
    p_head = doc.add_paragraph()
    set_para_format(p_head, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=12, line_spacing=1.5)
    set_run_font(p_head.add_run(z("คำนำ")), size=20, bold=True)

    preface_text = (
        "รายงานฉบับนี้จัดทำขึ้นเพื่อนำเสนอแผนธุรกิจและแผนดำเนินงานของโครงการ FixNow "
        "ซึ่งเป็นแพลตฟอร์มตัวกลางสำหรับการประสานงานและให้บริการช่วยเหลือรถยนต์นอกสถานที่ "
        "โดยมีเป้าหมายหลักเพื่อประกอบการพิจารณาขอรับเงินทุนสนับสนุนสำหรับการพัฒนาต้นแบบผลิตภัณฑ์ขั้นต่ำ (MVP) "
        "และการดำเนินงานทดสอบตลาดระยะนำร่อง (Pilot Phase) ในพื้นที่เป้าหมาย\n\n"
        "เนื้อหาภายในรายงานครอบคลุมการวิเคราะห์บริบทและความต้องการของผู้ใช้รถยนต์ (Customer Journey & Empathy Map) "
        "การประเมินขนาดตลาดเชิงสถิติ (TAM, SAM, SOM) แผนการบริหารจัดการองค์กร เกณฑ์การกำกับดูแลเครือข่ายช่าง "
        "การปฏิบัติตามกฎหมายที่เกี่ยวข้อง (ETDA, PDPA, ภาษีมูลค่าเพิ่ม) กระบวนการดำเนินงาน แผนการตลาดและการขาย "
        "ตลอดจนรายละเอียดการจัดสรรงบประมาณวงเงิน 120,000 บาท แผนการเงินและการวิเคราะห์จุดคุ้มทุน "
        "และมาตรการบริหารความเสี่ยงฉุกเฉิน ซึ่งสะท้อนถึงความเป็นไปได้ในการพัฒนาธุรกิจให้เติบโตอย่างมั่นคงและยั่งยืน\n\n"
        "คณะผู้จัดทำขอขอบพระคุณอาจารย์ที่ปรึกษา ผู้เชี่ยวชาญ และคณะกรรมการทุกท่านที่ได้กรุณาให้คำปรึกษา "
        "ข้อเสนอแนะ และแนวทางอันทรงคุณค่าตลอดการพัฒนาข้อเสนอโครงการนี้ คณะผู้จัดทำหวังเป็นอย่างยิ่งว่า "
        "รายงานฉบับนี้จะแสดงให้เห็นถึงศักยภาพ ความพร้อม และความตั้งใจจริงในการสร้างสรรค์นวัตกรรมบริการที่ตอบโจทย์สังคม "
        "และเป็นประโยชน์ต่อการพิจารณาให้การสนับสนุนต่อไป"
    )
    for p_para in preface_text.split("\n\n"):
        body_para(doc, p_para, indent=True)

    p_sig = doc.add_paragraph()
    set_para_format(p_sig, align=WD_ALIGN_PARAGRAPH.RIGHT, space_before=20, space_after=0, line_spacing=1.5)
    set_run_font(p_sig.add_run(z("คณะผู้จัดทำ")), size=16)

    p_sig_date = doc.add_paragraph()
    set_para_format(p_sig_date, align=WD_ALIGN_PARAGRAPH.RIGHT, space_before=0, space_after=0, line_spacing=1.5)
    set_run_font(p_sig_date.add_run(z("ตุลาคม 2569")), size=16)

    add_section_break(doc, 'nextPage')

    # ══════════════════════════════════════════════════════════════════════════
    # SECTION 3: สารบัญเนื้อหา (TOC - Header "ข")
    # ══════════════════════════════════════════════════════════════════════════
    print("Building Table of Contents...")
    p_toc_head = doc.add_paragraph()
    set_para_format(p_toc_head, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=12, line_spacing=1.5)
    set_run_font(p_toc_head.add_run(z("สารบัญ")), size=20, bold=True)

    toc_items = [
        {"title": "คำนำ", "page": "ก"},
        {"title": "สารบัญ", "page": "ข"},
        {"title": "สารบัญตาราง", "page": "ค"},
        {"title": "คำอธิบายคำย่อ", "page": "ง"},
        {"title": "บทที่ 1 บทสรุปผู้บริหาร (Executive Summary)", "page": "1", "subs": [
            {"title": "1.1 ที่มาและภาพรวมโครงการ", "page": "1"},
            {"title": "1.2 โมเดลธุรกิจและคุณค่าหลักที่ส่งมอบ", "page": "1"},
            {"title": "1.3 วัตถุประสงค์และขอบเขตการขอรับเงินทุนสนับสนุน", "page": "2"},
            {"title": "1.4 ตัวชี้วัดความสำเร็จและผลลัพธ์ที่คาดหวัง", "page": "2"},
        ]},
        {"title": "บทที่ 2 ภาพรวมธุรกิจและแนวคิดผลิตภัณฑ์ (Business Concept)", "page": "3", "subs": [
            {"title": "2.1 วิสัยทัศน์ พันธกิจ และเป้าหมายการเติบโต", "page": "3"},
            {"title": "2.2 ผลิตภัณฑ์ บริการ และรูปแบบการดำเนินธุรกิจ", "page": "3"},
            {"title": "2.3 การวิเคราะห์กลุ่มผู้มีส่วนได้ส่วนเสียหลัก", "page": "4"},
            {"title": "2.4 สถานะปัจจุบันและความพร้อมของโครงการ", "page": "4"},
        ]},
        {"title": "บทที่ 3 การวิเคราะห์ธุรกิจ สภาพแวดล้อม และตลาดเป้าหมาย (Market Analysis)", "page": "5", "subs": [
            {"title": "3.1 ปัญหาและความต้องการของผู้ใช้รถยนต์ (Customer Pain Points)", "page": "5"},
            {"title": "3.2 การประเมินขนาดตลาดเป้าหมาย (TAM / SAM / SOM)", "page": "5"},
            {"title": "3.3 สภาพการแข่งขันและบริการทดแทนในตลาด", "page": "6"},
            {"title": "3.4 การวิเคราะห์จุดแข็ง จุดอ่อน โอกาส และอุปสรรค (SWOT Analysis)", "page": "7"},
            {"title": "3.5 ปัจจัยความสำเร็จและเงื่อนไขการขยายธุรกิจ", "page": "7"},
        ]},
        {"title": "บทที่ 4 แผนการบริหารจัดการองค์กรและการกำกับดูแล (Organization & Governance)", "page": "8", "subs": [
            {"title": "4.1 โครงสร้างการบริหารและบทบาทหน้าที่ของทีมผู้ก่อตั้ง", "page": "8"},
            {"title": "4.2 ระบบการคัดเลือกและกำกับดูแลเครือข่ายช่างผู้ให้บริการ", "page": "8"},
            {"title": "4.3 ระบบควบคุมภายในและการบริหารงบประมาณอย่างโปร่งใส", "page": "9"},
            {"title": "4.4 การปฏิบัติตามกฎหมายและระเบียบข้อบังคับที่เกี่ยวข้อง", "page": "9"},
        ]},
        {"title": "บทที่ 5 แผนการดำเนินงานและกระบวนการให้บริการ (Operations & Service Delivery)", "page": "10", "subs": [
            {"title": "5.1 ขอบเขตผลิตภัณฑ์ขั้นต่ำสำหรับการทดสอบตลาด (MVP Scope)", "page": "10"},
            {"title": "5.2 กระบวนการให้บริการตั้งแต่ต้นจนจบ (Service Blueprint)", "page": "10"},
            {"title": "5.3 สถาปัตยกรรมเทคโนโลยีและระบบสารสนเทศ", "page": "11"},
            {"title": "5.4 การทดสอบระบบและการควบคุมคุณภาพการให้บริการ", "page": "11"},
            {"title": "5.5 ขีดความสามารถในการรองรับงานและแผนการบริหารกำลังคน", "page": "12"},
        ]},
        {"title": "บทที่ 6 แผนการตลาดและการขาย (Marketing and Sales Strategy)", "page": "12", "subs": [
            {"title": "6.1 การแบ่งส่วนตลาดและลูกค้าเป้าหมายระยะแรก", "page": "12"},
            {"title": "6.2 ตำแหน่งทางการตลาดและคุณค่าที่ส่งมอบ", "page": "13"},
            {"title": "6.3 กลยุทธ์ส่วนประสมทางการตลาด (Marketing Mix - 4Ps)", "page": "13"},
            {"title": "6.4 ยุทธศาสตร์การหาลูกค้ารายแรกและการสร้างความไว้วางใจ", "page": "13"},
            {"title": "6.5 แผนกิจกรรมทางการตลาดและตัวชี้วัดความสำเร็จ", "page": "14"},
            {"title": "6.6 กลยุทธ์การรักษาฐานลูกค้าและการขยายสู่ลูกค้าองค์กร", "page": "14"},
        ]},
        {"title": "บทที่ 7 รายละเอียดเงินลงทุนและแผนการจัดสรรงบประมาณ (Funding Request)", "page": "14", "subs": [
            {"title": "7.1 กรอบวงเงินทุนสนับสนุนและหลักการบริหารงบประมาณ", "page": "14"},
            {"title": "7.2 รายละเอียดการจัดสรรงบประมาณโครงการ วงเงิน 120,000 บาท", "page": "15"},
            {"title": "7.3 ความสมเหตุสมผลและหลักฐานอ้างอิงราคาค่าใช้จ่าย", "page": "15"},
            {"title": "7.4 แผนการเบิกจ่ายเงินทุนสนับสนุนตามงวดงานและเงื่อนไขความสำเร็จ", "page": "16"},
        ]},
        {"title": "บทที่ 8 แผนการเงินและการวิเคราะห์ความเป็นไปได้ (Financial Plan & Feasibility)", "page": "17", "subs": [
            {"title": "8.1 สมมติฐานหลักทางการเงินและโครงสร้างต้นทุน", "page": "17"},
            {"title": "8.2 การวิเคราะห์เศรษฐศาสตร์ต่อหน่วยและจุดคุ้มทุน (Unit Economics)", "page": "17"},
            {"title": "8.3 ประมาณการผลการดำเนินงานทางการเงิน 3 กรณีในปีแรก", "page": "18"},
            {"title": "8.4 ประมาณการปริมาณงานและกระแสเงินสดรายเดือนในปีแรก", "page": "19"},
            {"title": "8.5 แผนบริหารกระแสเงินสดและเงินสำรองสภาพคล่อง", "page": "20"},
            {"title": "8.6 แผนความยั่งยืนทางการเงินหลังสิ้นสุดเงินทุนสนับสนุน", "page": "20"},
        ]},
        {"title": "บทที่ 9 แผนบริหารความเสี่ยงและแผนฉุกเฉิน (Risk Management & Contingency)", "page": "20", "subs": [
            {"title": "9.1 การประเมินและบริหารจัดการความเสี่ยงที่สำคัญ", "page": "20"},
            {"title": "9.2 เกณฑ์การตัดสินใจเชิงกลยุทธ์ (Pivot, Persevere, or Kill Triggers)", "page": "21"},
            {"title": "9.3 แผนปฏิบัติการฉุกเฉินและการรักษาความปลอดภัยของผู้ใช้บริการ", "page": "21"},
        ]},
        {"title": "บทที่ 10 ภาคผนวก (Appendix)", "page": "22", "subs": [
            {"title": "ภาคผนวก ก: แผนการดำเนินงานระยะนำร่อง 12 สัปดาห์", "page": "22"},
            {"title": "ภาคผนวก ข: รายการตัวชี้วัดผลการดำเนินงานหลักสำหรับ Dashboard", "page": "23"},
            {"title": "ภาคผนวก ค: แบบฟอร์มการบันทึกข้อมูลและแนวทางการสัมภาษณ์ภาคสนาม", "page": "24"},
            {"title": "ภาคผนวก ง: รายการตรวจสอบความพร้อมก่อนยื่นเสนอขอรับทุนจริง", "page": "24"},
        ]},
        {"title": "บรรณานุกรม", "page": "24"}
    ]

    for item in toc_items:
        toc_row(doc, item["title"], item.get("page", ""), is_sub=False)
        for sub in item.get("subs", []):
            toc_row(doc, sub["title"], sub.get("page", ""), is_sub=True)

    add_section_break(doc, 'nextPage')

    # ══════════════════════════════════════════════════════════════════════════
    # SECTION 4: สารบัญตาราง & คำอธิบายคำย่อ (List of Tables & Abbreviations)
    # ══════════════════════════════════════════════════════════════════════════
    print("Building List of Tables...")
    p_lot_head = doc.add_paragraph()
    set_para_format(p_lot_head, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=12, line_spacing=1.5)
    set_run_font(p_lot_head.add_run(z("สารบัญตาราง")), size=20, bold=True)

    lot_items = [
        {"title": "ตารางที่ 3.1 การประเมินขนาดตลาดบริการช่วยเหลือรถยนต์นอกสถานที่ (TAM/SAM/SOM)", "page": "6"},
        {"title": "ตารางที่ 3.2 การวิเคราะห์จุดแข็ง จุดอ่อน โอกาส และอุปสรรค (SWOT Analysis)", "page": "7"},
        {"title": "ตารางที่ 4.1 บทบาทหน้าที่และความรับผิดชอบของทีมบริหารโครงการ FixNow", "page": "8"},
        {"title": "ตารางที่ 7.1 แผนการจัดสรรงบประมาณโครงการ FixNow วงเงิน 120,000 บาท", "page": "15"},
        {"title": "ตารางที่ 7.2 แผนการเบิกจ่ายเงินทุนสนับสนุนตามงวดงานและเงื่อนไขความสำเร็จ", "page": "16"},
        {"title": "ตารางที่ 8.1 สมมติฐานหลักทางการเงินสำหรับการประมาณการโครงการ FixNow", "page": "17"},
        {"title": "ตารางที่ 8.2 ประมาณการผลการดำเนินงานทางการเงิน 3 กรณีในปีแรก", "page": "18"},
        {"title": "ตารางที่ 8.3 ประมาณการปริมาณงานและกระแสเงินสดรายเดือนกรณีฐาน (เดือนที่ 1–12)", "page": "19"},
        {"title": "ตารางที่ 9.1 เมทริกซ์การประเมินและบริหารจัดการความเสี่ยงโครงการ FixNow", "page": "20"},
        {"title": "ตารางที่ 10.1 แผนการดำเนินงานระยะนำร่อง 12 สัปดาห์ (12-Week Roadmap)", "page": "22"},
        {"title": "ตารางที่ 10.2 ดัชนีชี้วัดผลการดำเนินงานหลักสำหรับ Dashboard (KPI Catalog)", "page": "23"},
    ]
    for item in lot_items:
        toc_row(doc, item["title"], item.get("page", ""), is_sub=False)

    doc.add_paragraph()
    p_abbr_head = doc.add_paragraph()
    set_para_format(p_abbr_head, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=16, space_after=12, line_spacing=1.5)
    set_run_font(p_abbr_head.add_run(z("คำอธิบายคำย่อ")), size=20, bold=True)

    abbreviations = [
        ("MVP", "Minimum Viable Product (ผลิตภัณฑ์ขั้นต่ำที่มีฟังก์ชันจำเป็นเพื่อทดสอบตลาด)"),
        ("TAM", "Total Addressable Market (ขนาดตลาดรวมที่เป็นไปได้ทั้งหมดในเชิงทฤษฎี)"),
        ("SAM", "Serviceable Addressable Market (ขนาดตลาดในกลุ่มยานพาหนะเป้าหมายที่แพลตฟอร์มให้บริการได้)"),
        ("SOM", "Serviceable Obtainable Market (ส่วนแบ่งตลาดเป้าหมายที่คาดว่าจะเข้าถึงได้จริงในระยะแรก)"),
        ("GMV", "Gross Merchandise Value (มูลค่ารวมของธุรกรรมบริการที่เกิดขึ้นผ่านแพลตฟอร์ม)"),
        ("CAC", "Customer Acquisition Cost (ต้นทุนเฉลี่ยในการได้มาซึ่งลูกค้าใหม่ต่อราย)"),
        ("KPI", "Key Performance Indicator (ดัชนีชี้วัดผลการดำเนินงานหลัก)"),
        ("ETA", "Estimated Time of Arrival (ประมาณการเวลาที่ช่างผู้ให้บริการจะเดินทางถึงจุดเกิดเหตุ)"),
        ("PDPA", "Personal Data Protection Act (พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562)"),
        ("ETDA", "Electronic Transactions Development Agency (สำนักงานพัฒนาธุรกรรมทางอิเล็กทรอนิกส์)"),
        ("VAT", "Value Added Tax (ภาษีมูลค่าเพิ่มตามประมวลรัษฎากร)")
    ]
    for abbr, full_desc in abbreviations:
        p_ab = doc.add_paragraph()
        set_para_format(p_ab, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=1, space_after=3, line_spacing=1.3)
        p_ab.paragraph_format.left_indent = Cm(1.27)
        p_ab.paragraph_format.first_line_indent = Cm(-1.27)
        r_a = p_ab.add_run(f"{abbr:<10} : ")
        set_run_font(r_a, size=15, bold=True)
        r_d = p_ab.add_run(z(full_desc))
        set_run_font(r_d, size=15, bold=False)

    add_section_break(doc, 'nextPage')

    # ══════════════════════════════════════════════════════════════════════════
    # SECTION 5: เนื้อหา 10 บทหลัก (Main Body - Header เลขหน้าอารบิก เริ่ม 1)
    # ══════════════════════════════════════════════════════════════════════════
    print("Building Chapter 1: Executive Summary...")

    # ─── บทที่ 1 ────────────────────────────────────────────────────────────
    chapter_heading(doc, 1, "บทสรุปผู้บริหาร (Executive Summary)")

    section_heading(doc, "1.1 ที่มาและภาพรวมโครงการ")
    body_para(doc, "โครงการ FixNow ได้รับการริเริ่มขึ้นจากปัญหาสำคัญที่ผู้ขับขี่รถยนต์ต้องเผชิญเมื่อเกิดเหตุขัดข้องฉุกเฉินนอกสถานที่ เช่น แบตเตอรี่หมด ยางแบน หรือเครื่องยนต์ดับกะทันหัน ซึ่งมักเกิดขึ้นโดยไม่คาดคิดและสร้างความตื่นตระหนกให้แก่ผู้ใช้รถ ในสถานการณ์ดังกล่าว ผู้ขับขี่ส่วนใหญ่ไม่ทราบว่าจะเริ่มต้นติดต่อขอความช่วยเหลือจากแหล่งใด ต้องเสียเวลาค้นหาข้อมูลและโทรศัพท์สอบถามอู่ซ่อมรถหลายแห่ง ไม่สามารถสื่อสารระบุตำแหน่งที่เกิดเหตุได้อย่างแม่นยำ ขาดความชัดเจนเรื่องเวลาที่ช่างจะเดินทางมาถึง และมีความกังวลต่อราคาค่าบริการที่อาจถูกปรับขึ้นอย่างไม่เป็นธรรม รวมถึงไม่มีบันทึกประวัติการรับบริการเพื่อใช้เป็นหลักฐานในการตรวจสอบภายหลัง")
    body_para(doc, "เพื่อแก้ไขปัญหาดังกล่าวอย่างเป็นรูปธรรม โครงการ FixNow จึงนำเสนอโมเดลธุรกิจแพลตฟอร์มตัวกลางดิจิทัล (Two-Sided Marketplace Platform) สำหรับประสานงานบริการช่วยเหลือรถยนต์นอกสถานที่ โดยทำหน้าที่เชื่อมโยงระหว่างผู้ใช้รถยนต์ที่ต้องการความช่วยเหลือฉุกเฉิน กับเครือข่ายช่างซ่อมและผู้ให้บริการอิสระในพื้นที่ ผ่านกระบวนการดำเนินงานที่เป็นระบบ ตั้งแต่การรับคำขอผ่านช่องทางออนไลน์ การระบุพิกัด GPS อัตโนมัติ การจับคู่งานกับช่างที่อยู่ใกล้เคียง การแจ้งราคาประเมินและระยะเวลาเดินทางก่อนเริ่มงาน ตลอดจนการเก็บบันทึกหลักฐานภาพถ่ายผลงานเพื่อความโปร่งใสในทุกขั้นตอน")

    section_heading(doc, "1.2 โมเดลธุรกิจและคุณค่าหลักที่ส่งมอบ")
    body_para(doc, "โมเดลธุรกิจของ FixNow มุ่งเน้นการดำเนินงานแบบ Asset-Light โดยแพลตฟอร์มไม่จำเป็นต้องลงทุนเป็นเจ้าของอู่ซ่อมหรือรถช่วยเหลือฉุกเฉินด้วยตนเอง แต่ใช้กลยุทธ์การรวบรวมและยกระดับศักยภาพของผู้ให้บริการอิสระและอู่ซ่อมท้องถิ่นที่มีความเชี่ยวชาญ เข้าสู่มาตรฐานการบริการเดียวกัน แพลตฟอร์มสร้างรายได้หลักจากค่าธรรมเนียมการบริหารจัดการ (Commission Fee) ในอัตรา 15% ของมูลค่าบริการต่องานที่สำเร็จ")
    body_para(doc, "คุณค่าหลักที่ FixNow ส่งมอบ (Value Proposition) ประกอบด้วย 4 มิติสำคัญ ได้แก่:")
    bullet_para(doc, "•  ความสะดวกรวดเร็วในขั้นตอนเดียว (One-Stop Assistance): ขอความช่วยเหลือได้ทันทีผ่านแพลตฟอร์ม FixNow (Web Application) โดยมีช่องทาง LINE Official Account คอยเชื่อมต่อและอำนวยความสะดวกส่งต่อผู้ใช้เข้าสู่ระบบได้ในคลิกเดียว โดยไม่ต้องโทรสอบถามหลายร้าน")
    bullet_para(doc, "•  ความโปร่งใสด้านราคาและเวลา (Price & ETA Transparency): ทราบค่าบริการมาตรฐานและระยะเวลาเดินทางของช่างล่วงหน้าก่อนอนุมัติงาน")
    bullet_para(doc, "•  ความน่าเชื่อถือและความปลอดภัย (Verified Providers): ผู้ให้บริการทุกคนผ่านการตรวจสอบตัวตน ทักษะความเชี่ยวชาญ และข้อตกลงมาตรฐานการให้บริการ")
    bullet_para(doc, "•  หลักฐานที่ตรวจสอบได้ (Digital Audit Trail): มีรายงานสรุปผลงาน ภาพถ่ายก่อน-หลังการซ่อม และใบเสร็จดิจิทัลสำหรับตรวจสอบย้อนหลัง")

    section_heading(doc, "1.3 วัตถุประสงค์และขอบเขตการขอรับเงินทุนสนับสนุน")
    body_para(doc, "รายงานแผนธุรกิจฉบับนี้จัดทำขึ้นเพื่อยื่นเสนอขอรับเงินทุนสนับสนุนการพัฒนาต้นแบบและการทดสอบตลาด ในวงเงินรวม 120,000 บาท โดยมีวัตถุประสงค์หลัก 4 ประการ:")
    bullet_para(doc, "•  เพื่อพัฒนาผลิตภัณฑ์ขั้นต่ำ (Minimum Viable Product: MVP) ของแพลตฟอร์ม FixNow ในรูปแบบ Responsive Web Application สำหรับผู้ใช้บริการและระบบจัดการงานหลังบ้าน (Dispatcher & Admin Portal) โดยมี LINE Official Account เป็นช่องทางเชื่อมต่อประสานงานและแจ้งเตือน")
    bullet_para(doc, "•  เพื่อตรวจสอบความต้องการของลูกค้า (Problem-Solution Validation) ผ่านการสัมภาษณ์เชิงลึกผู้ใช้รถอย่างน้อย 20 ราย และทดสอบการรับงานจริงในพื้นที่นำร่อง")
    bullet_para(doc, "•  เพื่อสร้างเครือข่ายช่างผู้ให้บริการนำร่องอย่างน้อย 10–15 ราย ที่ผ่านการตรวจสอบคุณสมบัติและลงนามในบันทึกข้อตกลงการให้บริการ")
    bullet_para(doc, "•  เพื่อทดสอบเศรษฐศาสตร์ต่อหน่วย (Unit Economics) ความคุ้มค่าของต้นทุนในการได้มาซึ่งลูกค้า (CAC) และความพึงพอใจ เพื่อนำไปใช้เป็นข้อมูลประกอบการตัดสินใจขยายขนาดธุรกิจในอนาคต")

    section_heading(doc, "1.4 ตัวชี้วัดความสำเร็จและผลลัพธ์ที่คาดหวัง")
    body_para(doc, "ภายใต้กรอบการดำเนินงานระยะเวลา 12 สัปดาห์ของการทดสอบนำร่อง และการวางแผนขยายตัวต่อเนื่องใน 12 เดือนแรก โครงการกำหนดเป้าหมายเชิงปริมาณในกรณีฐาน (Base Case) ไว้ดังนี้: ดำเนินงานสำเร็จรวม 1,200 งาน มูลค่างานบริการรวม (GMV) 1,200,000 บาท สร้างรายได้ค่าคอมมิชชันให้แก่แพลตฟอร์ม 180,000 บาท โดยมีอัตราความสำเร็จของงาน (Job Completion Rate) ไม่น้อยกว่า 85% ระยะเวลาตอบสนองช่างไม่เกิน 15 นาที และคะแนนความพึงพอใจของลูกค้าเฉลี่ยไม่ต่ำกว่า 4.2 จาก 5.0 คะแนน")

    # ─── บทที่ 2 ────────────────────────────────────────────────────────────
    page_break_para(doc)
    print("Building Chapter 2: Business Concept...")
    chapter_heading(doc, 2, "ภาพรวมธุรกิจและแนวคิดผลิตภัณฑ์ (Business Concept)")

    section_heading(doc, "2.1 วิสัยทัศน์ พันธกิจ และเป้าหมายการเติบโต")
    body_para(doc, "วิสัยทัศน์ (Vision): เป็นแพลตฟอร์มดิจิทัลชั้นนำที่ผู้ขับขี่รถยนต์ไว้วางใจสูงสุดเมื่อต้องการบริการช่วยเหลือฉุกเฉินนอกสถานที่ ด้วยมาตรฐานการบริการที่โปร่งใส ตรวจสอบได้ และสร้างความมั่นใจในทุกการเดินทาง")
    body_para(doc, "พันธกิจ (Mission):")
    bullet_para(doc, "•  ลดความยุ่งยากและเวลาในการค้นหาความช่วยเหลือของผู้ใช้รถยนต์ในยามฉุกเฉิน")
    bullet_para(doc, "•  ส่งเสริมรายได้และยกระดับมาตรฐานวิชาชีพของช่างซ่อมและผู้ให้บริการอิสระในท้องถิ่น")
    bullet_para(doc, "•  สร้างระบบนิเวศการให้บริการช่วยเหลือยานยนต์ที่โปร่งใสด้านราคาและมีหลักฐานดิจิทัลที่น่าเชื่อถือ")
    body_para(doc, "เป้าหมายการดำเนินงานตามกรอบเวลา (Strategic Roadmap):")
    bullet_para(doc, "•  เป้าหมายระยะสั้น (0–3 เดือน): พัฒนา MVP ให้แล้วเสร็จ ดำเนินการคัดเลือกและอบรมช่างนำร่อง 10 รายในพื้นที่เป้าหมาย และทดสอบการรับงานจริง 50 เคส")
    bullet_para(doc, "•  เป้าหมายระยะกลาง (4–12 เดือน): ปรับปรุงระบบสู่การจับคู่อัตโนมัติ ขยายเครือข่ายช่างครอบคลุมเขตเมืองหลัก และสร้างพันธมิตรกับกลุ่มลูกค้าองค์กรที่มีฟลีทรถ")
    bullet_para(doc, "•  เป้าหมายระยะยาว (ปีที่ 2 เป็นต้นไป): ขยายการให้บริการสู่ระดับภูมิภาค พัฒนาบริการเสริม เช่น การบำรุงรักษาเชิงป้องกันตามระยะทาง และการเชื่อมต่อระบบประกันภัย")

    section_heading(doc, "2.2 ผลิตภัณฑ์ บริการ และรูปแบบการดำเนินธุรกิจ")
    body_para(doc, "FixNow วางตำแหน่งเป็นผู้ให้บริการแพลตฟอร์มตัวกลาง (Digital Intermediary Platform) โดยในระยะเริ่มต้นมุ่งเน้นบริการช่วยเหลือฉุกเฉิน 3 กลุ่มหลักที่มีความถี่การเกิดเหตุสูงและมีขั้นตอนการแก้ไขที่ชัดเจน ได้แก่:")
    bullet_para(doc, "•  บริการด้านแบตเตอรี่: การพ่วงจั๊มสตาร์ตรถยนต์ และบริการเปลี่ยนแบตเตอรี่ใหม่นอกสถานที่")
    bullet_para(doc, "•  บริการด้านยาง: การปะยางแบบแทงไหม/สตรีม และการเปลี่ยนใส่ยางอะไหล่")
    bullet_para(doc, "•  บริการรถยก/รถสไลด์: ประสานงานเคลื่อนย้ายรถยนต์กรณีเกิดอุบัติเหตุหรือระบบขับเคลื่อนขัดข้องรุนแรง")
    body_para(doc, "รูปแบบธุรกรรมดำเนินการผ่านระบบออนไลน์ โดยลูกค้าส่งคำขอพร้อมระบุปัญหาและพิกัด ระบบประเมินค่าบริการมาตรฐานเบื้องต้นและส่งงานให้ช่างในรัศมีที่ใกล้ที่สุด เมื่อช่างตอบรับงาน ลูกค้าจะเห็นชื่อ เบอร์ติดต่อ และเวลาเดินทางโดยประมาณ (ETA) ของช่าง ช่างเข้าปฏิบัติงานและถ่ายภาพหลักฐานเข้าระบบ จากนั้นลูกค้าชำระเงินตรงต่อช่าง และระบบทำการบันทึกตัดค่าคอมมิชชัน 15% ตามเงื่อนไข")

    section_heading(doc, "2.3 การวิเคราะห์กลุ่มผู้มีส่วนได้ส่วนเสียหลัก")
    body_para(doc, "แพลตฟอร์ม FixNow มีผู้มีส่วนได้ส่วนเสียหลัก 3 กลุ่ม ที่มีบทบาทสัมพันธ์กันอย่างแนบแน่น:")
    bullet_para(doc, "•  กลุ่มผู้ใช้รถยนต์ทั่วไป (B2C Customers): ต้องการความช่วยเหลือที่รวดเร็ว ทราบราคาที่แน่นอน ไม่ถูกเอารัดเอาเปรียบ และต้องการความปลอดภัยในสถานการณ์คับขัน")
    bullet_para(doc, "•  กลุ่มช่างและผู้ให้บริการอิสระ (Service Providers): ต้องการเข้าถึงลูกค้าโดยไม่ต้องลงทุนทำการตลาดเอง มีระบบจัดสรรงานที่ยุติธรรม และได้รับเงินค่าแรงอย่างรวดเร็ว")
    bullet_para(doc, "•  กลุ่มองค์กรธุรกิจและพันธมิตร (B2B Fleet Partners): บริษัทรถเช่า โลจิสติกส์ หรือสำนักงานที่มีรถยนต์ใช้งาน ต้องการบริการช่วยเหลือฉุกเฉินที่มีใบกำกับภาษีและรายงานสรุปการซ่อมอย่างเป็นทางการ")

    section_heading(doc, "2.4 สถานะปัจจุบันและความพร้อมของโครงการ")
    body_para(doc, "ปัจจุบันโครงการ FixNow ผ่านการศึกษาความเป็นไปได้และออกแบบกระบวนการทำงานเบื้องต้น (Service Architecture) รวมถึงการจัดทำ Customer Journey และ Value Proposition Canvas เสร็จสิ้นแล้ว เงินทุนสนับสนุนจำนวน 120,000 บาทที่ขอรับในครั้งนี้ จะนำมาใช้เป็นทุนดำเนินงานสำหรับการพัฒนาซอฟต์แวร์ต้นแบบ การจัดกิจกรรมเปิดตลาดทดสอบ และเป็นทุนสำรองหมุนเวียนในการปฏิบัติงานภาคสนาม")

    # ─── บทที่ 3 ────────────────────────────────────────────────────────────
    page_break_para(doc)
    print("Building Chapter 3: Market Analysis...")
    chapter_heading(doc, 3, "การวิเคราะห์ธุรกิจ สภาพแวดล้อม และตลาดเป้าหมาย (Market Analysis)")

    section_heading(doc, "3.1 ปัญหาและความต้องการของผู้ใช้รถยนต์ (Customer Pain Points)")
    body_para(doc, "จากการศึกษาเส้นทางการใช้บริการ (Customer Journey) ของผู้ใช้รถยนต์ในประเทศไทยเมื่อประสบเหตุฉุกเฉิน พบปัญหาเชิงลึก 6 ประการที่ยังไม่ได้รับการแก้ไขอย่างมีประสิทธิภาพ:")
    bullet_para(doc, "•  ระยะที่ 1 (ความตื่นตระหนก): ขาดศูนย์กลางข้อมูล ไม่ทราบว่าจะติดต่อใครเป็นลำดับแรกเมื่อรถดับกลางทาง")
    bullet_para(doc, "•  ระยะที่ 2 (การค้นหา): ข้อมูลอู่ซ่อมบนอินเทอร์เน็ตมีกระจัดกระจายและไม่สามารถตรวจสอบความน่าเชื่อถือหรือความพร้อมในการออกนอกสถานที่ได้")
    bullet_para(doc, "•  ระยะที่ 3 (การติดต่อ): ต้องโทรศัพท์สอบถามหลายร้าน และมักได้รับการปฏิเสธเนื่องจากอยู่นอกเวลาทำการหรือไม่มีช่างว่าง")
    bullet_para(doc, "•  ระยะที่ 4 (การระบุตำแหน่ง): ผู้ใช้รถอธิบายสถานที่เกิดเหตุไม่ถูก โดยเฉพาะบนเส้นทางที่ไม่คุ้นเคยหรือถนนรอบเมือง")
    bullet_para(doc, "•  ระยะที่ 5 (ความไม่แน่นอน): ช่างไม่สามารถแจ้งเวลามาถึงที่ชัดเจน และราคาค่าซ่อมมักไม่มีมาตรฐานแน่นอน")
    bullet_para(doc, "•  ระยะที่ 6 (ความเสี่ยงหลังบริการ): ขาดใบเสร็จหรือบันทึกประวัติ หากเกิดข้อบกพร่องจากการซ่อมจะไม่สามารถเรียกร้องความรับผิดชอบได้")

    section_heading(doc, "3.2 การประเมินขนาดตลาดเป้าหมาย (TAM / SAM / SOM)")
    body_para(doc, "การประเมินขนาดตลาดของ FixNow อ้างอิงจากข้อมูลสถิติจำนวนรถจดทะเบียนสะสมของกรมการขนส่งทางบก (กระทรวงคมนาคม) ณ สิ้นปี พ.ศ. 2567 ซึ่งระบุว่าประเทศไทยมีรถยนต์จดทะเบียนสะสมรวมทั้งสิ้น 44.91 ล้านคัน โดยเป็นกลุ่มรถยนต์นั่งส่วนบุคคลไม่เกิน 7 คน (รย.1) จำนวน 12.17 ล้านคัน และรถยนต์บรรทุกส่วนบุคคล (รย.3) จำนวน 7.06 ล้านคัน รวมเป็นฐานยานพาหนะเป้าหมายหลัก 19.23 ล้านคัน")
    body_para(doc, "คณะผู้จัดทำได้นำตัวเลขดังกล่าวมาสร้างแบบจำลองขนาดตลาด โดยกำหนดสมมติฐานความถี่ในการเกิดเหตุฉุกเฉินที่ต้องการช่างนอกสถานที่เฉลี่ย 0.10 ครั้งต่อคันต่อปี ค่าบริการเฉลี่ย 1,000 บาทต่อครั้ง และอัตราค่าคอมมิชชันของแพลตฟอร์ม 15% ดังแสดงในตารางที่ 3.1")

    # Table 3.1
    tam_headers = ["ระดับตลาด", "นิยามและฐานประชากรยานพาหนะ", "มูลค่าตลาดรวม (GMV)", "รายได้แพลตฟอร์ม (15%)"]
    tam_rows = [
        ["TAM (Total Market)", "รถยนต์นั่งและบรรทุกส่วนบุคคลทั่วประเทศ 19.23 ล้านคัน", "1,923 ล้านบาท/ปี", "288.45 ล้านบาท/ปี"],
        ["SAM (Serviceable Market)", "รถยนต์ในเขตเมืองหลักและพื้นที่นำร่องประมาณ 500,000 คัน", "50 ล้านบาท/ปี", "7.50 ล้านบาท/ปี"],
        ["SOM (Obtainable Market)", "เป้าหมายส่วนแบ่งตลาดระยะแรก (ปีที่ 1) จำนวน 1,200 งาน", "1.20 ล้านบาท/ปี", "180,000 บาท/ปี"]
    ]
    add_academic_table(doc, "3.1", "การประเมินขนาดตลาดบริการช่วยเหลือรถยนต์นอกสถานที่ (TAM, SAM, SOM)",
                       tam_headers, tam_rows, [3.20, 5.58, 3.25, 3.25],
                       note="คำนวณจากสมมติฐานความถี่เกิดเหตุ 0.10 ครั้ง/คัน/ปี ราคาเฉลี่ย 1,000 บาท/งาน และคอมมิชชัน 15%")

    section_heading(doc, "3.3 สภาพการแข่งขันและบริการทดแทนในตลาด")
    body_para(doc, "ในปัจจุบันผู้ใช้รถสามารถเข้าถึงความช่วยเหลือผ่านช่องทางทดแทนเดิม ได้แก่: 1) การโทรหาอู่ประจำที่คุ้นเคย 2) การค้นหาผ่าน Google Maps 3) บริการช่วยเหลือฉุกเฉินที่แถมมากับประกันภัยชั้น 1 และ 4) การโพสต์ขอความช่วยเหลือในกลุ่มโซเชียลมีเดียท้องถิ่น")
    body_para(doc, "อย่างไรก็ตาม บริการเดิมเหล่านี้มีข้อจำกัดที่ชัดเจน เช่น ประกันภัยมักให้บริการฟรีเฉพาะเงื่อนไขจำกัดและใช้เวลารอนาน ส่วนการค้นหาเองผ่านอินเทอร์เน็ตก็มีความเสี่ยงเรื่องความปลอดภัยและราคาที่ไม่โปร่งใส FixNow จึงเข้ามาเติมเต็มช่องว่างนี้ด้วยการเป็นตัวกลางที่มีมาตรฐานและการันตีความโปร่งใส")

    section_heading(doc, "3.4 การวิเคราะห์จุดแข็ง จุดอ่อน โอกาส และอุปสรรค (SWOT Analysis)")
    body_para(doc, "การวิเคราะห์สภาพแวดล้อมทางธุรกิจของ FixNow สรุปประเด็นเชิงกลยุทธ์ได้ดังตารางที่ 3.2")

    # Table 3.2
    swot_headers = ["มิติการวิเคราะห์", "ประเด็นเชิงกลยุทธ์และแนวทางดำเนินงานของ FixNow"]
    swot_rows = [
        ["จุดแข็ง (Strengths)", "• โมเดลธุรกิจแบบ Asset-Light คล่องตัว ไม่แบกรับต้นทุนคงที่ของอู่ซ่อม\n• ระบบตรวจสอบพิกัดและแจ้งราคาโปร่งใส สร้างความไว้วางใจได้ทันที\n• มีหลักฐานดิจิทัลบันทึกทุกเคส ลดข้อพิพาทเรื่องคุณภาพงาน"],
        ["จุดอ่อน (Weaknesses)", "• เป็นแบรนด์ใหม่ที่ยังต้องสร้างการรับรู้และความเชื่อถือในระยะเริ่มต้น\n• ในระยะแรกยังต้องใช้เจ้าหน้าที่ช่วยประสานงานควบคู่กับระบบอัตโนมัติ\n• ขีดความสามารถขึ้นอยู่กับความหนาแน่นของเครือข่ายช่างในพื้นที่"],
        ["โอกาส (Opportunities)", "• รถยนต์ที่มีอายุการใช้งานเกิน 5 ปี มีสัดส่วนเพิ่มขึ้นอย่างต่อเนื่อง\n• พฤติกรรมผู้บริโภคคุ้นชินกับการเรียกใช้บริการดิจิทัลผ่านสมาร์ตโฟนและเว็บแพลตฟอร์ม\n• อู่ซ่อมและช่างอิสระต้องการช่องทางเพิ่มรายได้โดยไม่มีต้นทุนโฆษณา"],
        ["อุปสรรค (Threats)", "• สภาพการจราจรและสภาพอากาศอาจส่งผลกระทบต่อเวลาเดินทางของช่าง\n• ความผันผวนของราคาน้ำมันและอะไหล่ส่งผลต่อค่าบริการ\n• ข้อจำกัดด้านกฎระเบียบแพลตฟอร์มดิจิทัลและการคุ้มครองข้อมูลส่วนบุคคล"]
    ]
    add_academic_table(doc, "3.2", "การวิเคราะห์จุดแข็ง จุดอ่อน โอกาส และอุปสรรค (SWOT Analysis)",
                       swot_headers, swot_rows, [4.20, 11.08],
                       note="วิเคราะห์จากข้อมูลสภาพแวดล้อมอุตสาหกรรมยานยนต์และพฤติกรรมผู้บริโภคยุคดิจิทัล")

    section_heading(doc, "3.5 ปัจจัยความสำเร็จและเงื่อนไขการขยายธุรกิจ")
    body_para(doc, "ปัจจัยแห่งความสำเร็จสูงสุดของ FixNow ในระยะนำร่อง คือ ความหนาแน่นของเครือข่ายช่างในพื้นที่ (Network Density) และเวลาตอบสนอง (Response Time) โครงการจึงกำหนดเงื่อนไขในการขยายพื้นที่บริการไว้ว่า จะขยายไปยังอำเภอหรือจังหวัดถัดไปก็ต่อเมื่อในพื้นที่เดิมมีอัตราการตอบรับงานสำเร็จเกิน 90% และมีกำไรส่วนเกินต่อเคสเป็นบวกต่อเนื่องไม่น้อยกว่า 8 สัปดาห์")

    # ─── บทที่ 4 ────────────────────────────────────────────────────────────
    page_break_para(doc)
    print("Building Chapter 4: Organization & Governance...")
    chapter_heading(doc, 4, "แผนการบริหารจัดการองค์กรและการกำกับดูแล (Organization & Governance)")

    section_heading(doc, "4.1 โครงสร้างการบริหารและบทบาทหน้าที่ของทีมผู้ก่อตั้ง")
    body_para(doc, "ในระยะทดสอบนำร่อง FixNow ดำเนินงานด้วยโครงสร้างทีมขนาดกะทัดรัดที่มุ่งเน้นความคล่องตัวและการตัดสินใจที่รวดเร็ว โดยผู้ร่วมก่อตั้งทั้ง 4 ท่านแบ่งหน้าที่ความรับผิดชอบหลักตามความเชี่ยวชาญ ดังแสดงในตารางที่ 4.1")

    # Table 4.1
    org_headers = ["ตำแหน่ง / บทบาท", "ผู้รับผิดชอบ", "ขอบเขตความรับผิดชอบหลัก", "รูปแบบการดำเนินงาน"]
    org_rows = [
        ["ผู้จัดการโครงการและพัฒนาธุรกิจ", "นายวรพงษ์ ทินช่วย", "บริหารแผนงานรวม ประสานงานแหล่งทุน เจรจาพันธมิตร และดูแลแผนการเงิน", "เต็มเวลา (Full-Time)"],
        ["หัวหน้าฝ่ายเทคโนโลยีและระบบ", "นายวัสยศ ภูถาดถม", "พัฒนาแพลตฟอร์มหลัก (Web Application & Core System) สถาปัตยกรรมคลาวด์ และระบบเชื่อมต่อช่องทางสื่อสาร", "เต็มเวลา (Full-Time)"],
        ["หัวหน้าฝ่ายปฏิบัติการและเครือข่ายบริการ", "นายรัชชานนท์ ขันตี", "คัดเลือกและอบรมช่าง จัดการเคสบริการ ควบคุมคุณภาพ และกำกับดูแลเวลาตอบสนอง (SLA)", "เต็มเวลา (Full-Time)"],
        ["หัวหน้าฝ่ายการตลาดและลูกค้าสัมพันธ์", "นายชนาธิป ศรีประวงศ์", "วางแผนกลยุทธ์การตลาด บริหารแคมเปญหาลูกค้าใหม่ ดูแลลูกค้าสัมพันธ์ และประชาสัมพันธ์แบรนด์", "เต็มเวลา (Full-Time)"]
    ]
    add_academic_table(doc, "4.1", "บทบาทหน้าที่และความรับผิดชอบของทีมบริหารโครงการ FixNow",
                       org_headers, org_rows, [4.00, 3.28, 5.50, 2.50],
                       note="ในระยะนำร่องทีมผู้ก่อตั้งไม่รับเงินเดือนประจำ โดยจัดสรรเวลาทุ่มเทเต็มความสามารถ")

    section_heading(doc, "4.2 ระบบการคัดเลือกและกำกับดูแลเครือข่ายช่างผู้ให้บริการ")
    body_para(doc, "เพื่อรักษามาตรฐานการบริการและความปลอดภัยของลูกค้า FixNow กำหนดกระบวนการคัดกรองช่าง (Mechanic Onboarding & Vetting) อย่างเข้มงวด 5 ขั้นตอน:")
    bullet_para(doc, "•  ขั้นตอนที่ 1: ตรวจสอบเอกสารยืนยันตัวตน สำเนาบัตรประชาชน ทะเบียนบ้าน และเอกสารประกอบกิจการหรือใบรับรองวิชาชีพ")
    bullet_para(doc, "•  ขั้นตอนที่ 2: สัมภาษณ์ประเมินทักษะความชำนาญ เครื่องมือประจำรถ ความพร้อมในการเดินทาง และขอบเขตพื้นที่ที่รับผิดชอบ")
    bullet_para(doc, "•  ขั้นตอนที่ 3: ลงนามในข้อตกลงมาตรฐานการให้บริการ (Service Level Agreement) การกำหนดอัตราค่าแรงมาตรฐาน และอัตราคอมมิชชัน 15%")
    bullet_para(doc, "•  ขั้นตอนที่ 4: อบรมการใช้งานระบบ การสื่อสารอย่างสุภาพ และมาตรฐานความปลอดภัยในการทำงานบนท้องถนน")
    bullet_para(doc, "•  ขั้นตอนที่ 5: การประเมินคุณภาพต่อเนื่องผ่านระบบเรตติ้ง หากคะแนนเฉลี่ยต่ำกว่า 4.0 หรือมีข้อร้องเรียนเรื่องความไม่โปร่งใส จะถูกระงับการจ่ายงานทันที")

    section_heading(doc, "4.3 ระบบควบคุมภายในและการบริหารงบประมาณอย่างโปร่งใส")
    body_para(doc, "โครงการยึดมั่นในหลักธรรมาภิบาลและการใช้จ่ายงบประมาณอย่างคุ้มค่า ทุกคำขอใช้บริการจะได้รับรหัสเคสเฉพาะ (Unique Case ID) เพื่อติดตามสถานะ รายได้ และค่าคอมมิชชันในระบบคลาวด์แบบเรียลไทม์ การเบิกจ่ายเงินทุนสนับสนุน 120,000 บาททุกรายการต้องมีเอกสารหลักฐาน เช่น ใบเสร็จรับเงิน ใบกำกับภาษี หรือใบสำคัญรับเงิน พร้อมจัดทำทะเบียนคุมงบประมาณเปรียบเทียบแผนกับผลการใช้จริงรายสัปดาห์")

    section_heading(doc, "4.4 การปฏิบัติตามกฎหมายและระเบียบข้อบังคับที่เกี่ยวข้อง")
    body_para(doc, "FixNow ได้เตรียมความพร้อมในการปฏิบัติตามกรอบกฎหมายที่เกี่ยวข้อง 3 ด้านหลัก:")
    bullet_para(doc, "•  พระราชกฤษฎีกาการประกอบธุรกิจบริการแพลตฟอร์มดิจิทัล (ETDA): ศึกษาและเตรียมเอกสารการจดแจ้งข้อมูลต่อ ETDA ตามเกณฑ์ผู้ประกอบการแพลตฟอร์มดิจิทัลขนาดเล็ก")
    bullet_para(doc, "•  พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA): จัดทำประกาศความเป็นส่วนตัว (Privacy Notice) และระบบยินยอม (Consent) ในการจัดเก็บข้อมูลชื่อ เบอร์โทรศัพท์ พิกัด และภาพถ่าย โดยเก็บรักษาบนระบบคลาวด์ที่มีการเข้ารหัสและจำกัดสิทธิ์เข้าถึง")
    bullet_para(doc, "•  กฎหมายภาษีอากร: วางระบบบัญชีเพื่อรองรับการยื่นภาษีเงินได้นิติบุคคล และติดตามเกณฑ์รายรับ 1.8 ล้านบาทต่อปีสำหรับการจดทะเบียนภาษีมูลค่าเพิ่ม (VAT)")

    # ─── บทที่ 5 ────────────────────────────────────────────────────────────
    page_break_para(doc)
    print("Building Chapter 5: Operations & Delivery...")
    chapter_heading(doc, 5, "แผนการดำเนินงานและกระบวนการให้บริการ (Operations & Service Delivery)")

    section_heading(doc, "5.1 ขอบเขตผลิตภัณฑ์ขั้นต่ำสำหรับการทดสอบตลาด (MVP Scope)")
    body_para(doc, "เพื่อความประหยัดและคล่องตัวในระยะเริ่มต้น FixNow กำหนดขอบเขตฟังก์ชันของระบบ MVP ไว้เฉพาะส่วนที่จำเป็นต่อการพิสูจน์คุณค่าของบริการ (Core Value Validation):")
    bullet_para(doc, "•  ส่วนหน้าสำหรับลูกค้า (Customer Facing): เว็บแอปพลิเคชัน Responsive ที่ใช้งานง่ายบนสมาร์ตโฟน รองรับการเลือกประเภทปัญหา การดึงพิกัด GPS อัตโนมัติ การระบุเบอร์ติดต่อ และการแสดงสถานะงาน")
    bullet_para(doc, "•  ช่องทางการสื่อสารและแจ้งเตือน (Notification & Communication Gateway): ระบบแจ้งเตือนอัตโนมัติบนแพลตฟอร์ม และเชื่อมต่อผ่าน LINE Official Account เพื่อส่งการแจ้งเตือนสถานะการเดินทางของช่าง และเป็นจุดเชื่อมโยง (Entry Gate) พาลูกค้าเข้าสู่หน้าจัดการบริการบนแพลตฟอร์ม")
    bullet_para(doc, "•  ระบบจัดการงานหลังบ้าน (Admin & Dispatch Dashboard): ระบบสำหรับเจ้าหน้าที่ในการตรวจสอบพิกัด ดูรายชื่อช่างที่พร้อมปฏิบัติงาน และจ่ายงานอย่างรวดเร็ว")
    bullet_para(doc, "•  ฟังก์ชันที่เลื่อนไปพัฒนาในเฟส 2: ระบบชำระเงินตัดบัตรเครดิตอัตโนมัติในแอป ระบบแชตแบบเรียลไทม์ และระบบคำนวณเส้นทางจราจรอัจฉริยะ")

    section_heading(doc, "5.2 กระบวนการให้บริการตั้งแต่ต้นจนจบ (Service Blueprint)")
    body_para(doc, "กระบวนการไหลของงานบริการ (End-to-End Service Flow) แบ่งออกเป็น 7 ขั้นตอนมาตรฐาน:")
    bullet_para(doc, "•  1. รับคำขอ: ลูกค้าเข้าสู่ระบบ กรอกประเภทปัญหา และแชร์พิกัดสถานที่เกิดเหตุ")
    bullet_para(doc, "•  2. ตรวจสอบข้อมูล: ระบบ/เจ้าหน้าที่ตรวจสอบความถูกต้องของพิกัดและโทรยืนยันกับลูกค้าภายใน 3 นาที")
    bullet_para(doc, "•  3. จัดสรรงาน: ระบบค้นหาช่างที่มีทักษะตรงกับงานในรัศมีใกล้ที่สุดและส่งข้อความแจ้งเตือนช่าง")
    bullet_para(doc, "•  4. ช่างตอบรับ: ช่างยืนยันรับงานพร้อมแจ้งเวลาเดินทางโดยประมาณ (ETA)")
    bullet_para(doc, "•  5. แจ้งลูกค้า: ระบบส่งข้อมูลช่าง เบอร์โทรศัพท์ และ ETA ให้ลูกค้ารับทราบ")
    bullet_para(doc, "•  6. ปฏิบัติงาน: ช่างเดินทางถึงที่หมาย ตรวจสอบหน้างาน แจ้งยืนยันราคาก่อนเริ่มซ่อม และถ่ายภาพบันทึกผลงาน")
    bullet_para(doc, "•  7. ปิดเคสและประเมินผล: ลูกค้าตรวจสอบงาน ชำระค่าบริการ และให้คะแนนความพึงพอใจในระบบ")

    section_heading(doc, "5.3 สถาปัตยกรรมเทคโนโลยีและระบบสารสนเทศ")
    body_para(doc, "FixNow เลือกใช้สถาปัตยกรรมเทคโนโลยีแบบ Serverless และ Cloud-Based ที่มีต้นทุนเริ่มต้นต่ำและมีความยืดหยุ่นสูง:")
    bullet_para(doc, "•  Frontend: พัฒนาด้วย Next.js / Tailwind CSS รองรับการแสดงผลทุกหน้าจอมือถืออย่างรวดเร็ว")
    bullet_para(doc, "•  Communication & Notification: Webhook Integration และ LINE Messaging API สำหรับบรอดแคสต์และส่งการแจ้งเตือนสถานะเคสอัตโนมัติไปยังผู้ใช้")
    bullet_para(doc, "•  Backend & Database: Cloud Database (Supabase / Firebase) ที่มีระบบรักษาความปลอดภัยและการสำรองข้อมูลอัตโนมัติรายวัน")
    bullet_para(doc, "•  Location Service: OpenStreetMap และ Google Maps API สำหรับการปักหมุดตำแหน่ง")

    section_heading(doc, "5.4 การทดสอบระบบและการควบคุมคุณภาพการให้บริการ")
    body_para(doc, "ก่อนเปิดรับงานจริง ระบบจะต้องผ่านการทดสอบ User Acceptance Testing (UAT) ในสภาพแวดล้อมจำลอง ทั้งการส่งคำขอในจุดอับสัญญาณ การทดสอบในกรณีที่ช่างปฏิเสธงาน และการกู้คืนระบบจากข้อมูลสำรอง พร้อมทั้งกำหนดเกณฑ์ Service Level Agreement (SLA) โดยช่างต้องติดต่อกลับลูกค้าภายใน 5 นาทีหลังรับงาน และเดินทางถึงจุดเกิดเหตุภายในระยะเวลาไม่เกิน 30–45 นาทีในเขตเมือง")

    section_heading(doc, "5.5 ขีดความสามารถในการรองรับงานและแผนการบริหารกำลังคน")
    body_para(doc, "ในระยะทดสอบนำร่อง ขีดความสามารถเป้าหมายของทีมงานอยู่ที่ 5–10 เคสต่อวัน ซึ่งสามารถรองรับได้ด้วยทีมงานผู้ก่อตั้งร่วมกับเจ้าหน้าที่ประสานงาน 1 อัตรา เมื่อปริมาณงานเฉลี่ยเพิ่มขึ้นเกิน 15 เคสต่อวัน โครงการจะจัดสรรรายได้จากค่าคอมมิชชันมาจ้างเจ้าหน้าที่ประสานงานเพิ่มเติมแบบกะเวลา")

    # ─── บทที่ 6 ────────────────────────────────────────────────────────────
    page_break_para(doc)
    print("Building Chapter 6: Marketing & Sales...")
    chapter_heading(doc, 6, "แผนการตลาดและการขาย (Marketing and Sales Strategy)")

    section_heading(doc, "6.1 การแบ่งส่วนตลาดและลูกค้าเป้าหมายระยะแรก")
    body_para(doc, "FixNow แบ่งส่วนตลาดและมุ่งเน้นกลุ่มเป้าหมายในระยะทดสอบนำร่องเป็น 3 กลุ่มหลัก:")
    bullet_para(doc, "•  กลุ่มผู้ใช้รถยนต์ส่วนบุคคลที่มีอายุใช้งาน 5–12 ปี: กลุ่มนี้มีความเสี่ยงของความเสื่อมสภาพทางอุปกรณ์สูง (แบตเตอรี่, ไดสตาร์ต, ยาง) และส่วนใหญ่หมดระยะรับประกันจากศูนย์บริการแล้ว")
    bullet_para(doc, "•  กลุ่มผู้ขับขี่เพศหญิงและผู้ขับขี่มือใหม่: ให้ความสำคัญสูงสุดกับความปลอดภัย ความสะดวก และความไว้วางใจในการมีตัวกลางช่วยประสานงาน")
    bullet_para(doc, "•  กลุ่มคนทำงานที่เดินทางข้ามอำเภอ/จังหวัดเป็นประจำ: ต้องการหลักประกันความอุ่นใจในการเดินทางและช่องทางขอความช่วยเหลือที่รวดเร็วตลอด 24 ชั่วโมง")

    section_heading(doc, "6.2 ตำแหน่งทางการตลาดและคุณค่าที่ส่งมอบ")
    body_para(doc, "FixNow กำหนดตำแหน่งทางการตลาดเป็น “แพลตฟอร์มช่วยเหลือรถยนต์นอกสถานที่ที่โปร่งใส เชื่อถือได้ และรวดเร็วที่สุดในท้องถิ่น” โดยไม่แข่งขันด้านราคาตัดราคากับอู่ซ่อม แต่แข่งขันด้วยคุณภาพการบริการ ความโปร่งใสของราคา และความสะดวกรวดเร็วของระบบดิจิทัล")

    section_heading(doc, "6.3 กลยุทธ์ส่วนประสมทางการตลาด (Marketing Mix - 4Ps)")
    body_para(doc, "• ด้านผลิตภัณฑ์ (Product): เน้นบริการที่ได้มาตรฐาน ช่างมีมารยาท ตรวจสอบได้ มีรูปภาพยืนยันผลงาน และมีระบบช่วยเหลือตลอดการเดินทาง")
    body_para(doc, "• ด้านราคา (Price): ราคาค่าบริการเป็นไปตามมาตรฐานที่ตกลงไว้ล่วงหน้า ลูกค้าทราบราคาประเมินก่อนตัดสินใจ ช่างได้รับค่าแรงที่เป็นธรรม และแพลตฟอร์มหักค่าคอมมิชชัน 15% จากมูลค่าบริการ")
    body_para(doc, "• ด้านช่องทาง (Place): ให้บริการหลักผ่านแพลตฟอร์ม FixNow (Web Application) ที่รองรับการใช้งานบนเบราว์เซอร์สมาร์ตโฟนทุกระบบอย่างลื่นไหล พร้อมเชื่อมต่อกับช่องทาง LINE Official Account เพื่อให้ผู้ใช้สามารถคลิกเปิดเข้าสู่หน้าแพลตฟอร์มได้ทันทีโดยไม่ต้องดาวน์โหลดแอปพลิเคชันขนาดใหญ่ให้เปลืองพื้นที่หน่วยความจำ")
    body_para(doc, "• ด้านการส่งเสริมการตลาด (Promotion): ประชาสัมพันธ์ผ่านคอนเทนต์ให้ความรู้เรื่องการดูแลรถยนต์ การซื้อโฆษณาตามพิกัดพื้นที่ (Local Hyper-Targeting Ads) และการแจกสติกเกอร์เบอร์ฉุกเฉินสะท้อนแสงติดรถยนต์")

    section_heading(doc, "6.4 ยุทธศาสตร์การหาลูกค้ารายแรกและการสร้างความไว้วางใจ")
    body_para(doc, "เพื่อให้ได้ลูกค้า 100 รายแรก โครงการดำเนินกลยุทธ์เชิงรุกผ่านการสร้างเครือข่ายพันธมิตรกับร้านประดับยนต์ อู่ซ่อมรถ คาร์แคร์ และการมอบโค้ดส่วนลดค่าบริการฉุกเฉิน 50 บาทสำหรับผู้ใช้ใหม่บนแพลตฟอร์ม ควบคู่กับการผลิตคอนเทนต์วิดีโอสั้นจำลองสถานการณ์ “รถดับกลางคืน ทำอย่างไร” เพื่อนำผู้ใช้เข้าสู่การใช้งานบนระบบ FixNow")

    section_heading(doc, "6.5 แผนกิจกรรมทางการตลาดและตัวชี้วัดความสำเร็จ")
    body_para(doc, "กิจกรรมการตลาดในระยะนำร่องจัดสรรงบประมาณรวม 25,000 บาท มุ่งเน้นการวัดผลแบบ Data-Driven โดยมีตัวชี้วัดสำคัญ ได้แก่ ต้นทุนเฉลี่ยต่อการได้ลูกค้า (CAC) ไม่เกิน 80 บาทต่อคำขอ จำนวนผู้เข้าชมและลงทะเบียนใช้งานบนแพลตฟอร์มไม่น้อยกว่า 500 บัญชี และมีผู้ติดตามช่องทางสื่อสารประชาสัมพันธ์อย่างต่อเนื่อง")

    section_heading(doc, "6.6 กลยุทธ์การรักษาฐานลูกค้าและการขยายสู่ลูกค้าองค์กร")
    body_para(doc, "เนื่องจากการเกิดเหตุฉุกเฉินมีความถี่ต่อบุคคลไม่สูง การรักษาความผูกพันกับลูกค้าจึงใช้ระบบแจ้งเตือนการบำรุงรักษาเชิงป้องกัน เช่น เตือนรอบเปลี่ยนแบตเตอรี่ทุก 1.5 ปี หรือเตือนสลับยาง พร้อมการเจรจากับผู้ประกอบการรถเช่าท้องถิ่นเพื่อให้บริการเป็น Sub-Contractor ประจำฟลีท")

    # ─── บทที่ 7 ────────────────────────────────────────────────────────────
    page_break_para(doc)
    print("Building Chapter 7: Funding Request...")
    chapter_heading(doc, 7, "รายละเอียดเงินลงทุนและแผนการจัดสรรงบประมาณ (Funding Request)")

    section_heading(doc, "7.1 กรอบวงเงินทุนสนับสนุนและหลักการบริหารงบประมาณ")
    body_para(doc, "โครงการ FixNow ขอรับเงินทุนสนับสนุนการพัฒนาต้นแบบและการทดสอบตลาด ในวงเงินรวมทั้งสิ้น 120,000 บาท (หนึ่งแสนสองหมื่นบาทถ้วน) โดยจัดสรรงบประมาณตามหลักความคุ้มค่า ความประหยัด และการมุ่งเน้นผลสัมฤทธิ์เป็นสำคัญ การจัดสรรแบ่งออกเป็น 4 หมวดหลัก ดังแสดงในตารางที่ 7.1")

    # Table 7.1
    budget_headers = ["ลำดับ", "หมวดรายจ่าย / กิจกรรม", "งบประมาณ (บาท)", "สัดส่วน (%)", "ผลผลิตที่ได้รับ"]
    budget_rows = [
        ["1", "การพัฒนาและทดสอบระบบซอฟต์แวร์ต้นแบบ (MVP)", "28,000", "23.33%", "แพลตฟอร์ม Web Application, แดชบอร์ดจัดการงาน และระบบเชื่อมต่อช่องทางสื่อสาร"],
        ["2", "การทดสอบตลาด ประชาสัมพันธ์ และหาเครือข่ายช่าง", "25,000", "20.83%", "ช่างเครือข่าย 10 ราย, ลูกค้าทดลอง 50 เคสแรก, สื่อโปรโมต"],
        ["3", "ค่าธรรมเนียมวิชาชีพ กฎหมาย บัญชี และใบอนุญาต", "23,000", "19.17%", "ตรวจทานสัญญากับช่าง, ที่ปรึกษา ETDA/PDPA, จัดตั้งธุรกิจเบื้องต้น"],
        ["4", "ค่าเช่าระบบคลาวด์ แผนที่ API และเครื่องมือไอที (6 ด.)", "10,000", "8.33%", "คลาวด์โฮสติ้ง, โดเมนเนม, ระบบแจ้งเตือน Messaging API, Map API"],
        ["5", "เงินทุนหมุนเวียนและเงินสำรองสภาพคล่องดำเนินงาน", "34,000", "28.33%", "เงินสำรองฉุกเฉินและเสริมสภาพคล่องตลอดระยะนำร่อง 12 สัปดาห์"],
        ["รวม", "งบประมาณรวมทั้งสิ้นที่ขอรับการสนับสนุน", "120,000", "100.00%", "ต้นแบบแพลตฟอร์มที่เปิดใช้งานจริงและเครือข่ายช่างนำร่อง"]
    ]
    add_academic_table(doc, "7.1", "แผนการจัดสรรงบประมาณโครงการ FixNow วงเงิน 120,000 บาท",
                       budget_headers, budget_rows, [1.50, 6.28, 2.50, 2.00, 3.00],
                       note="งบประมาณทุกหมวดมีเอกสารหลักฐานประกอบและควบคุมผ่านทะเบียนคุมงบประมาณ")

    section_heading(doc, "7.2 ความสมเหตุสมผลและหลักฐานอ้างอิงราคาค่าใช้จ่าย")
    body_para(doc, "รายการค่าใช้จ่ายทุกหมวดได้รับการประมาณการอย่างสมเหตุสมผล โดยงบพัฒนาแพลตฟอร์มซอฟต์แวร์ 28,000 บาท เป็นค่าจ้างทดสอบความปลอดภัยของระบบเว็บและ API หลังบ้าน เนื่องจากทีมผู้ก่อตั้งลงมือเขียนโค้ดและพัฒนาระบบหลักเองทั้งหมด ค่าบริการระบบคลาวด์ โดเมนเนม และ API แจ้งเตือนอ้างอิงตามอัตราค่าบริการมาตรฐานของระบบคลาวด์สากลและระบบส่งข้อความแจ้งเตือนอัตโนมัติ")

    section_heading(doc, "7.3 แผนการเบิกจ่ายเงินทุนสนับสนุนตามงวดงานและเงื่อนไขความสำเร็จ")
    body_para(doc, "เพื่อสร้างความมั่นใจแก่คณะกรรมการพิจารณาทุน โครงการเสนอแผนการเบิกจ่ายงบประมาณแบ่งเป็น 3 งวดงานตามความสำเร็จของผลงาน ดังแสดงในตารางที่ 7.2")

    # Table 7.2
    disb_headers = ["งวดที่", "สัดส่วน", "วงเงิน (บาท)", "เงื่อนไขความสำเร็จและผลงานส่งมอบ"]
    disb_rows = [
        ["งวดที่ 1", "50%", "60,000", "เมื่ออนุมัติโครงการ: จัดตั้งทีม ส่งมอบเอกสาร System Architecture และเริ่มพัฒนา MVP"],
        ["งวดที่ 2", "30%", "36,000", "เมื่อผ่านการทดสอบ MVP: ส่งมอบระบบซอฟต์แวร์ และลงนามข้อตกลงเครือข่ายช่างครบ 10 ราย"],
        ["งวดที่ 3", "20%", "24,000", "เมื่อสิ้นสุดระยะนำร่อง: ให้บริการสำเร็จครบ 50 เคสแรก และส่งมอบรายงานสรุปผลการทดสอบตลาด"],
        ["รวม", "100%", "120,000", "ผลสัมฤทธิ์ตามเป้าหมายของโครงการครบถ้วนทุกมิติ"]
    ]
    add_academic_table(doc, "7.2", "แผนการเบิกจ่ายเงินทุนสนับสนุนตามงวดงานและเงื่อนไขความสำเร็จ",
                       disb_headers, disb_rows, [2.00, 2.00, 2.78, 8.50],
                       note="การเบิกจ่ายเป็นไปตามระเบียบของหน่วยงานให้ทุนและผ่านการตรวจรับโดยคณะกรรมการ")

    # ─── บทที่ 8 ────────────────────────────────────────────────────────────
    page_break_para(doc)
    print("Building Chapter 8: Financial Plan...")
    chapter_heading(doc, 8, "แผนการเงินและการวิเคราะห์ความเป็นไปได้ (Financial Plan & Feasibility)")

    section_heading(doc, "8.1 สมมติฐานหลักทางการเงินและโครงสร้างต้นทุน")
    body_para(doc, "การประมาณการทางการเงินของ FixNow ตั้งอยู่บนสมมติฐานที่ระมัดระวัง (Conservative Assumptions) จากข้อมูลการทดสอบและข้อเท็จจริงในอุตสาหกรรม ดังแสดงในตารางที่ 8.1")

    # Table 8.1
    fin_headers = ["ตัวแปรทางการเงิน", "ค่าสมมติฐานตั้งต้น", "คำอธิบายและที่มาของตัวเลข"]
    fin_rows = [
        ["มูลค่าบริการเฉลี่ยต่องาน (Average Ticket Size)", "1,000 บาท/งาน", "ถัวเฉลี่ยระหว่างงานพ่วงแบตเตอรี่ (400-600 บ.) ยาง (300-500 บ.) และรถยก (1,500-2,500 บ.)"],
        ["อัตราค่าคอมมิชชันแพลตฟอร์ม (Take Rate)", "15% ของ GMV", "คิดเป็นรายได้ของแพลตฟอร์มเฉลี่ย 150 บาทต่องานที่สำเร็จ"],
        ["ต้นทุนผันแปรต่องาน (Variable Cost per Job)", "35 บาท/งาน", "ค่าธรรมเนียมธุรกรรมการเงิน, SMS แจ้งเตือน, และค่าระบบแผนที่ API"],
        ["กำไรส่วนเกินต่องาน (Contribution Margin)", "115 บาท/งาน", "คำนวณจากรายได้ 150 บาท หักต้นทุนผันแปร 35 บาท (คิดเป็น Margin 76.7%)"],
        ["ต้นทุนคงที่ดำเนินงาน (Fixed Cost M4-12)", "4,000 บาท/เดือน", "ค่าเช่าคลาวด์เซิร์ฟเวอร์, ระบบแจ้งเตือน, ซิมการ์ดโทรศัพท์ และเครื่องมือบริหารแพลตฟอร์ม"],
        ["เงินลงทุนตั้งต้นและเปิดตลาด (Initial CapEx/OpEx)", "86,000 บาท", "งบเตรียมระบบ การตลาด และค่าธรรมเนียมกฎหมายในช่วง 3 เดือนแรก"]
    ]
    add_academic_table(doc, "8.1", "สมมติฐานหลักทางการเงินสำหรับการประมาณการโครงการ FixNow",
                       fin_headers, fin_rows, [5.00, 3.28, 7.00],
                       note="สมมติฐานอ้างอิงจากการศึกษาโมเดลแพลตฟอร์มบริการร่วมกับโครงสร้างราคาช่างท้องถิ่น")

    section_heading(doc, "8.2 การวิเคราะห์เศรษฐศาสตร์ต่อหน่วยและจุดคุ้มทุน (Unit Economics)")
    body_para(doc, "การคำนวณจุดคุ้มทุนเชิงเงินสดในปีแรก (Cash Break-Even Point) พิจารณาจาก:")
    bullet_para(doc, "•  ต้นทุนรวมในปีแรก = ค่าเตรียมการเปิดตลาด 86,000 บาท + ต้นทุนคงที่เดือนที่ 4–12 (4,000 × 9 = 36,000 บาท) = 122,000 บาท")
    bullet_para(doc, "•  กำไรส่วนเกินต่อเคส (Contribution Margin per Job) = 115 บาท")
    bullet_para(doc, "•  จุดคุ้มทุนเชิงปริมาณงาน = 122,000 บาท ÷ 115 บาท = 1,061 งานสำเร็จ")
    body_para(doc, "นั่นหมายความว่า หากแพลตฟอร์มสามารถให้บริการสำเร็จเฉลี่ยเดือนละ 110–120 งาน ในช่วงเดือนที่ 4–12 โครงการจะคุ้มทุนค่าใช้จ่ายในการเปิดตลาดและเลี้ยงตัวเองได้ด้วยกระแสเงินสดจากการดำเนินงาน")

    section_heading(doc, "8.3 ประมาณการผลการดำเนินงานทางการเงิน 3 กรณีในปีแรก")
    body_para(doc, "เพื่อประเมินความเสี่ยงและโอกาส โครงการได้จำลองผลประกอบการในปีแรกเป็น 3 กรณี ดังแสดงในตารางที่ 8.2")

    # Table 8.2
    scen_headers = ["กรณีสถานการณ์", "จำนวนงาน (เคส)", "มูลค่างาน GMV (บ.)", "รายได้ 15% (บ.)", "ต้นทุนผันแปร (บ.)", "ต้นทุนคงที่รวม (บ.)", "กำไรก่อนภาษี/เจ้าของ (บ.)"]
    scen_rows = [
        ["กรณีต่ำ (Worst Case)", "400", "400,000", "60,000", "14,000", "122,000", "-76,000"],
        ["กรณีฐาน (Base Case)", "1,200", "1,200,000", "180,000", "42,000", "122,000", "+16,000"],
        ["กรณีสูง (Best Case)", "2,400", "2,400,000", "360,000", "84,000", "122,000", "+154,000"]
    ]
    add_academic_table(doc, "8.2", "ประมาณการผลการดำเนินงานทางการเงิน 3 กรณีในปีแรก",
                       scen_headers, scen_rows, [3.00, 2.00, 2.28, 2.00, 2.00, 2.00, 2.00],
                       note="ในกรณีต่ำ โครงการยังมีเงินสำรองสภาพคล่อง 34,000 บาทช่วยพยุง และปรับลดงบดำเนินงานได้")

    section_heading(doc, "8.4 ประมาณการปริมาณงานและกระแสเงินสดรายเดือนในปีแรก")
    body_para(doc, "ในกรณีฐาน (Base Case) โครงการประมาณการการเติบโตของปริมาณงานและกระแสเงินสดรายเดือน 12 เดือนแรก ดังแสดงในตารางที่ 8.3")

    # Table 8.3
    m_headers = ["ช่วงเวลา", "งานสำเร็จ (เคส)", "GMV (บาท)", "รายได้คอมมิชชัน (บาท)", "ต้นทุนผันแปร (บาท)", "กำไรส่วนเกิน (บาท)"]
    m_rows = [
        ["เดือนที่ 1", "0", "0", "0", "0", "0"],
        ["เดือนที่ 2", "0", "0", "0", "0", "0"],
        ["เดือนที่ 3", "20", "20,000", "3,000", "700", "2,300"],
        ["เดือนที่ 4", "40", "40,000", "6,000", "1,400", "4,600"],
        ["เดือนที่ 5", "60", "60,000", "9,000", "2,100", "6,900"],
        ["เดือนที่ 6", "90", "90,000", "13,500", "3,150", "10,350"],
        ["เดือนที่ 7", "120", "120,000", "18,000", "4,200", "13,800"],
        ["เดือนที่ 8", "140", "140,000", "21,000", "4,900", "16,100"],
        ["เดือนที่ 9", "160", "160,000", "24,000", "5,600", "18,400"],
        ["เดือนที่ 10", "180", "180,000", "27,000", "6,300", "20,700"],
        ["เดือนที่ 11", "190", "190,000", "28,500", "6,650", "21,850"],
        ["เดือนที่ 12", "200", "200,000", "30,000", "7,000", "23,000"],
        ["รวมปีที่ 1", "1,200", "1,200,000", "180,000", "42,000", "138,000"]
    ]
    add_academic_table(doc, "8.3", "ประมาณการปริมาณงานและกระแสเงินสดรายเดือนกรณีฐาน (เดือนที่ 1–12)",
                       m_headers, m_rows, [2.28, 2.50, 2.50, 2.80, 2.60, 2.60],
                       note="เดือนที่ 1-2 เป็นช่วงวิจัยและพัฒนาระบบ รายได้เริ่มเกิดขึ้นตั้งแต่เดือนที่ 3 เป็นต้นไป")

    section_heading(doc, "8.5 แผนบริหารกระแสเงินสดและเงินสำรองสภาพคล่อง")
    body_para(doc, "โครงการมีเงินสำรองสภาพคล่อง 34,000 บาท ซึ่งคิดเป็น 28.3% ของวงเงินทุนทั้งหมด เงินก้อนนี้จะถูกล็อกไว้ในบัญชีเฉพาะและใช้ได้เฉพาะกรณีเกิดเหตุจำเป็น เช่น ค่าใช้จ่ายฉุกเฉินในการดูแลลูกค้า หรือชดเชยต้นทุนโฮสติ้งหากปริมาณผู้ใช้งานเพิ่มสูงกว่าคาด")

    section_heading(doc, "8.6 แผนความยั่งยืนทางการเงินหลังสิ้นสุดเงินทุนสนับสนุน")
    body_para(doc, "เมื่อสิ้นสุดระยะเวลาสนับสนุน 12 เดือน FixNow จะมีความยั่งยืนทางการเงินจากรายได้ค่าคอมมิชชันที่แตะระดับ 30,000 บาทต่อเดือนในเดือนที่ 12 ซึ่งเพียงพอในการครอบคลุมต้นทุนคงที่รายเดือน (4,000 บาท) และสร้างกระแสเงินสดสุทธิสำหรับจ้างงานประจำและขยายฟังก์ชันระบบในเฟสถัดไป")

    # ─── บทที่ 9 ────────────────────────────────────────────────────────────
    page_break_para(doc)
    print("Building Chapter 9: Risk Management...")
    chapter_heading(doc, 9, "แผนบริหารความเสี่ยงและแผนฉุกเฉิน (Risk Management & Contingency)")

    section_heading(doc, "9.1 การประเมินและบริหารจัดการความเสี่ยงที่สำคัญ")
    body_para(doc, "โครงการได้ทำการวิเคราะห์ความเสี่ยงที่อาจส่งผลกระทบต่อความสำเร็จ พร้อมกำหนดมาตรการป้องกันและแก้ไขล่วงหน้า ดังแสดงในตารางที่ 9.1")

    # Table 9.1
    risk_headers = ["ความเสี่ยงสำคัญ", "ระดับ", "สัญญาณเตือนล่วงหน้า", "มาตรการป้องกันและตอบสนอง", "ผู้รับผิดชอบ"]
    risk_rows = [
        ["ช่างไม่รับงานหรือมาช้ากว่ากำหนด", "สูง", "อัตราปฏิเสธงานเกิน 20% หรือเกิน ETA 15 นาที", "กำหนดช่างสำรองในพื้นที่ และให้โบนัสเคสเร่งด่วน", "ฝ่ายปฏิบัติการ"],
        ["ปัญหาข้อพิพาทเรื่องราคาหน้างาน", "ปานกลาง", "มีลูกค้าร้องเรียนเรื่องราคาเกินใบประเมิน", "บังคับแจ้งราคาแยกรายการและให้ลูกค้ากดยืนยันก่อนทำ", "ฝ่ายปฏิบัติการ"],
        ["ระบบเว็บหรือฐานข้อมูลขัดข้อง", "ปานกลาง", "ระบบไม่สามารถรับคำขอหรือพิกัดผิดพลาด", "มีระบบสำรองฐานข้อมูลรายวัน (Automated Backup) และมีระบบรับแจ้งเหตุฉุกเฉินสำรองผ่านโทรศัพท์สายด่วนชั่วคราว", "ฝ่ายเทคโนโลยี"],
        ["ปริมาณคำขอน้อยกว่าเป้าหมาย", "สูง", "งานสำเร็จเฉลี่ยต่ำกว่า 5 เคส/สัปดาห์ในเดือนที่ 4", "ปรับกลยุทธ์การตลาด เจาะกลุ่มรถเช่า/ฟลีทขนส่งในพื้นที่", "ฝ่ายพัฒนาธุรกิจ"],
        ["ข้อร้องเรียนด้านข้อมูลส่วนบุคคล", "ต่ำ", "ผู้ใช้สอบถามนโยบายหรือขอลบข้อมูล", "ปฏิบัติตามมาตรฐาน PDPA ลบข้อมูลพิกัดเมื่อปิดงานครบกำหนด", "ผู้จัดการโครงการ"]
    ]
    add_academic_table(doc, "9.1", "เมทริกซ์การประเมินและบริหารจัดการความเสี่ยงโครงการ FixNow",
                       risk_headers, risk_rows, [3.20, 1.30, 3.50, 4.78, 2.50],
                       note="ประเมินระดับความเสี่ยงจากผลกระทบและโอกาสเกิดเหตุตามเกณฑ์บริหารความเสี่ยงสากล")

    section_heading(doc, "9.2 เกณฑ์การตัดสินใจเชิงกลยุทธ์ (Strategic Decision Triggers)")
    body_para(doc, "เพื่อป้องกันการสูญเสียงบประมาณ โครงการกำหนดจุดตรวจวัดการตัดสินใจ (Decision Milestones) ไว้ 3 ระดับ:")
    bullet_para(doc, "•  เกณฑ์การไปต่อ (Persevere): อัตราความสำเร็จงาน >80% กำไรส่วนเกินต่อเคสเป็นบวก และคะแนนพึงพอใจ >4.0")
    bullet_para(doc, "•  เกณฑ์การปรับโมเดล (Pivot): หากลูกค้าใช้บริการน้อยแต่ช่างตอบรับดี ปรับไปเน้นบริการ B2B กับบริษัทรถเช่าและประกันภัย")
    bullet_para(doc, "•  เกณฑ์การหยุดโครงการ (Kill): หากหลังสัปดาห์ที่ 8 มีการเรียกใช้น้อยกว่า 10 เคส และช่างไม่ให้ความร่วมมือ ให้หยุดการใช้จ่ายและคืนเงินทุนคงเหลือ")

    section_heading(doc, "9.3 แผนปฏิบัติการฉุกเฉินและการรักษาความปลอดภัยของผู้ใช้บริการ")
    body_para(doc, "ความปลอดภัยของลูกค้าและช่างบนท้องถนนถือเป็นสิ่งสำคัญสูงสุด หากเกิดเหตุการณ์ฉุกเฉิน เช่น ช่างประสบอุบัติเหตุระหว่างเดินทาง หรือมีข้อพิพาทรุนแรง ทีมงานมีกระบวนการเข้าช่วยเหลือทันที ประสานหน่วยกู้ภัยหรือตำรวจท้องที่ พร้อมมีวงเงินเยียวยาเบื้องต้นและบันทึกข้อเท็จจริงในรายงานสรุปเหตุการณ์ (Incident Report)")

    # ─── บทที่ 10 ───────────────────────────────────────────────────────────
    page_break_para(doc)
    print("Building Chapter 10: Appendix...")
    chapter_heading(doc, 10, "ภาคผนวก (Appendix)")

    section_heading(doc, "ภาคผนวก ก: แผนการดำเนินงานระยะนำร่อง 12 สัปดาห์")
    body_para(doc, "ตารางที่ 10.1 แสดงแผนการดำเนินงานรายสัปดาห์ตลอดระยะเวลานำร่อง 12 สัปดาห์ (Gantt Milestone Schedule)")

    # Table 10.1
    gantt_headers = ["สัปดาห์ที่", "กิจกรรมและเป้าหมายการดำเนินงาน", "ผู้รับผิดชอบ", "งบประมาณ (บ.)", "ผลผลิตที่ส่งมอบ"]
    gantt_rows = [
        ["1–2", "จัดทำสถาปัตยกรรมระบบ วางข้อกำหนดซอฟต์แวร์ และเตรียมเอกสารกฎหมาย", "ทีมผู้ก่อตั้ง", "5,000", "System Spec & สัญญาช่าง"],
        ["3–5", "พัฒนาแพลตฟอร์มเว็บ MVP (Core Web App), แดชบอร์ด และฐานข้อมูลคลาวด์", "ฝ่ายเทคโนโลยี", "20,000", "ซอฟต์แวร์แพลตฟอร์ม MVP Version 1.0"],
        ["6–7", "ลงพื้นที่สรรหา คัดกรอง และลงนามข้อตกลงเครือข่ายช่าง 10 รายแรก", "ฝ่ายปฏิบัติการ", "8,000", "เครือข่ายช่างพร้อมรับงาน"],
        ["8–9", "ทดสอบระบบปิด (End-to-End Testing) จำลอง 20 สถานการณ์จริง", "ทีมผู้ก่อตั้ง", "3,000", "รายงานผลการทดสอบระบบ"],
        ["10–11", "เปิดบริการนำร่อง (Pilot Launch) รับงานจริงเป้าหมาย 30–50 เคสแรก", "ฝ่ายปฏิบัติการ", "12,000", "บันทึกผลงานและรายได้จริง"],
        ["12", "สรุปผลการดำเนินงาน วิเคราะห์ Unit Economics และทำเล่มรายงานปิดเฟส", "ผู้จัดการโครงการ", "2,000", "รายงานผลการทดสอบตลาด"]
    ]
    add_academic_table(doc, "10.1", "แผนการดำเนินงานระยะนำร่อง 12 สัปดาห์ (12-Week Roadmap)",
                       gantt_headers, gantt_rows, [1.80, 5.50, 2.50, 2.20, 3.28],
                       note="กิจกรรมทุกสัปดาห์มีการติดตามผลและบันทึกความก้าวหน้าในทะเบียนคุมโครงการ")

    section_heading(doc, "ภาคผนวก ข: รายการตัวชี้วัดผลการดำเนินงานหลักสำหรับ Dashboard")
    body_para(doc, "ตารางที่ 10.2 แสดงรายการตัวชี้วัดผลงานหลัก (KPI Catalog) ที่ใช้ติดตามบนแดชบอร์ดบริหาร")

    # Table 10.2
    kpi_headers = ["ตัวชี้วัด (KPI)", "คำนิยามและสูตรการคำนวณ", "เป้าหมายระยะนำร่อง", "ความถี่ในการวัดผล"]
    kpi_rows = [
        ["Time-to-Accept", "เวลาเฉลี่ยตั้งแต่ลูกค้าส่งคำขอจนช่างกดยืนยันรับงาน", "< 5 นาที", "รายเคส / สรุปรายวัน"],
        ["ETA Accuracy", "ความคลาดเคลื่อนระหว่างเวลาที่แจ้งกับเวลาที่ช่างถึงจริง", "± ไม่เกิน 10 นาที", "รายเคส / สรุปรายสัปดาห์"],
        ["Job Completion Rate", "สัดส่วนของงานที่ดำเนินการสำเร็จต่องานที่เปิดทั้งหมด", "> 85%", "รายสัปดาห์"],
        ["Customer Rating", "คะแนนความพึงพอใจเฉลี่ยที่ลูกค้าประเมินหลังปิดงาน", "> 4.2 / 5.0 ดาว", "รายเคส / สรุปรายสัปดาห์"],
        ["Contribution per Job", "รายได้ค่าคอมมิชชันหักด้วยต้นทุนผันแปรต่องาน", "> 115 บาท/งาน", "รายเดือน"]
    ]
    add_academic_table(doc, "10.2", "ดัชนีชี้วัดผลการดำเนินงานหลักสำหรับ Dashboard (KPI Catalog)",
                       kpi_headers, kpi_rows, [3.20, 5.08, 3.50, 3.50],
                       note="ใช้ติดตามผลเพื่อปรับปรุงคุณภาพบริการและรายงานต่อคณะกรรมการพิจารณาทุน")

    section_heading(doc, "ภาคผนวก ค: แบบฟอร์มการบันทึกข้อมูลและแนวทางการสัมภาษณ์ภาคสนาม")
    body_para(doc, "ในระหว่างการดำเนินงานภาคสนาม ทีมงานจะใช้แบบฟอร์มดิจิทัลในการรวบรวมข้อมูลสำคัญ 3 ชุด ได้แก่: 1) แบบฟอร์มสัมภาษณ์เชิงลึกผู้ใช้รถยนต์เพื่อวัด Willingness-to-Pay 2) แบบฟอร์มตรวจประเมินมาตรฐานอู่ซ่อมและช่างอิสระ และ 3) แบบบันทึกการส่งงานและหลักฐานภาพถ่ายความเสียหายก่อน-หลังการซ่อม เพื่อให้มั่นใจว่าทุกข้อมูลมีความถูกต้องตามระเบียบวิจัย")

    section_heading(doc, "ภาคผนวก ง: รายการตรวจสอบความพร้อมก่อนยื่นเสนอขอรับทุนจริง")
    body_para(doc, "คณะผู้จัดทำได้ตรวจสอบความพร้อมของเอกสารตามข้อกำหนดมาตรฐานของกองทุนสนับสนุนนวัตกรรม (เช่น TED Fund, กองทุนนวัตกรรม มข.) ครบถ้วนทั้งด้านประวัติทีมงาน โครงสร้างงบประมาณ 120,000 บาท แผนงาน 12 สัปดาห์ การวิเคราะห์สิทธิในทรัพย์สินทางปัญญา และแนวทางการขยายผลเชิงพาณิชย์")

    # ══════════════════════════════════════════════════════════════════════════
    # BIBLIOGRAPHY / REFERENCES (บรรณานุกรม)
    # ══════════════════════════════════════════════════════════════════════════
    page_break_para(doc)
    print("Building Bibliography...")
    p_ref_head = doc.add_paragraph()
    set_para_format(p_ref_head, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=12, line_spacing=1.5)
    set_run_font(p_ref_head.add_run(z("บรรณานุกรม")), size=20, bold=True)

    academic_references = [
        "[1] สำนักงานสถิติแห่งชาติ. (2568). Statistical Yearbook Thailand 2025: ตาราง 15.3 สถิติจำนวนรถจดทะเบียนสะสมจำแนกตามประเภท พ.ศ. 2566–2567 (ข้อมูลจากกรมการขนส่งทางบก). สืบค้นจาก https://www.nso.go.th/public/e-book/Statistical-Yearbook/SYB-2025/483/",
        "[2] ธนาคารกรุงศรีอยุธยา, ฝ่ายวิจัยกรุงศรี. (2569). แนวโน้มธุรกิจและอุตสาหกรรมไทย ปี 2569–2571: อุตสาหกรรมยานยนต์และชิ้นส่วน (รายงานฉบับวันที่ 23 กรกฎาคม 2569). สืบค้นจาก https://www.krungsri.com/th/research/industry/summary-outlook/2026-2028",
        "[3] สำนักงานพัฒนาธุรกรรมทางอิเล็กทรอนิกส์ (ETDA). (2567). พระราชกฤษฎีกาการประกอบธุรกิจบริการแพลตฟอร์มดิจิทัลที่ต้องแจ้งให้ทราบ พ.ศ. 2565 และแนวปฏิบัติการกำกับดูแล. สืบค้นจาก https://www.etda.or.th/th/regulator/Digitalplatform/regulate.aspx",
        "[4] สำนักงานพัฒนาธุรกรรมทางอิเล็กทรอนิกส์ (ETDA). (2567). รวมคำถามที่พบบ่อย (FAQ) เกี่ยวกับเกณฑ์การจดแจ้งและยกเว้นสำหรับบริการแพลตฟอร์มดิจิทัลขนาดเล็ก. สืบค้นจาก https://www.etda.or.th/th/contact/faq/Digital-Platform.aspx",
        "[5] สำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล. (2562). พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA). ราชกิจจานุเบกษา เล่ม 136 ตอนที่ 69 ก. สืบค้นจาก https://ratchakitcha.soc.go.th/documents/17082307.pdf",
        "[6] กรมสรรพากร. (2567). สิทธิและหน้าที่ของผู้ประกอบการจดทะเบียนภาษีมูลค่าเพิ่ม (VAT) และเกณฑ์รายรับเกิน 1.8 ล้านบาทต่อปี. สืบค้นจาก https://rd.go.th/7061.html",
        "[7] กรมพัฒนาธุรกิจการค้า. (2568). คู่มือและขั้นตอนการจดทะเบียนจัดตั้งบริษัทจำกัดและห้างหุ้นส่วนนิติบุคคล. สืบค้นจาก https://www.dbd.go.th/download/downloads/03_boj/intro_step_bj_establish_1.pdf",
        "[8] LINE for Business. (2569). คู่มือการใช้งาน Messaging API และฟังก์ชันการเชื่อมต่อระบบแจ้งเตือนอัตโนมัติสำหรับธุรกิจ. สืบค้นจาก https://lineforbusiness.com/th/service/line-oa-features",
        "[9] Omise (Opn Payments). (2569). ค่าธรรมเนียมและอัตราค่าบริการระบบรับชำระเงินดิจิทัลในประเทศไทย (PromptPay & Credit Card). สืบค้นจาก https://www.omise.co/th/pricing/thailand",
        "[10] สำนักงานพัฒนาธุรกรรมทางอิเล็กทรอนิกส์ (ETDA). (2568). รายงานผลการสำรวจพฤติกรรมผู้ใช้อินเทอร์เน็ตในประเทศไทย (Thailand Internet User Behavior). สืบค้นจาก https://www.etda.or.th/th/statistics-and-information.aspx"
    ]

    for ref in academic_references:
        p_ref = doc.add_paragraph()
        set_para_format(p_ref, space_before=0, space_after=6, line_spacing=1.5)
        p_ref.paragraph_format.left_indent = Cm(1.27)
        p_ref.paragraph_format.first_line_indent = Cm(-1.27)
        set_run_font(p_ref.add_run(z(ref)), size=16)

    # ══════════════════════════════════════════════════════════════════════════
    # SECTION SETUP
    # ══════════════════════════════════════════════════════════════════════════
    print("Configuring margins and section headers...")
    def _setup_section(s):
        s.page_width = Cm(21)
        s.page_height = Cm(29.7)
        s.left_margin = Cm(3.18)    # ระยะเย็บเล่มซ้าย 3.18 ซม.
        s.right_margin = Cm(2.54)   # ขวา 2.54 ซม.
        s.top_margin = Cm(2.54)     # บน 2.54 ซม.
        s.bottom_margin = Cm(2.54)  # ล่าง 2.54 ซม.

    for s in doc.sections:
        _setup_section(s)

    # Section 0: ปก (ไม่มี Header)
    doc.sections[0].different_first_page_header_footer = True

    # Section 1: คำนำ (Header "ก")
    set_header_static(doc.sections[1], "ก")

    # Section 2: สารบัญ (Header "ข")
    set_header_static(doc.sections[2], "ข")

    # Section 3: สารบัญตาราง & คำย่อ (Header "ค")
    set_header_static(doc.sections[3], "ค")

    # Section 4: เนื้อหาหลัก (Header เลขหน้าอารบิก เริ่ม 1)
    doc.sections[4].different_first_page_header_footer = False
    set_header_page_number(doc.sections[4])
    restart_page_number(doc.sections[4], start=1)

    # ══════════════════════════════════════════════════════════════════════════
    # FINAL PASS: Strict 16 pt Enforcement Across 100% of Document Elements
    # ══════════════════════════════════════════════════════════════════════════
    print("Enforcing strict 16 pt font size across 100% of text runs...")
    def enforce_16pt(r):
        r.font.name = FONT
        r.font.size = Pt(16)
        rPr = r._r.get_or_add_rPr()
        rFonts = rPr.find(qn('w:rFonts'))
        if rFonts is None:
            rFonts = OxmlElement('w:rFonts')
            rPr.insert(0, rFonts)
        for attr in ('w:ascii', 'w:hAnsi', 'w:cs', 'w:eastAsia'):
            rFonts.set(qn(attr), FONT)
        for sz_attr in ('w:sz', 'w:szCs'):
            sz_el = rPr.find(qn(sz_attr))
            if sz_el is None:
                sz_el = OxmlElement(sz_attr)
                rPr.append(sz_el)
            sz_el.set(qn('w:val'), '32')

    for s in doc.sections:
        for p in s.header.paragraphs:
            for r in p.runs:
                enforce_16pt(r)
        for p in s.footer.paragraphs:
            for r in p.runs:
                enforce_16pt(r)

    for p in doc.paragraphs:
        for r in p.runs:
            enforce_16pt(r)

    for t in doc.tables:
        for row in t.rows:
            for cell in row.cells:
                for p in cell.paragraphs:
                    for r in p.runs:
                        enforce_16pt(r)

    print(f"Saving final report to {output_file}...")
    doc.save(output_file)
    print("Document successfully generated and saved!")


if __name__ == '__main__':
    generate_executive_report()
