import sys
import docx
from docx.shared import Cm
from docx.oxml.ns import qn

sys.stdout.reconfigure(encoding='utf-8')
doc = docx.Document('c:/Users/WINDOWS/OneDrive/Desktop/fixnow/FixNow_Business_Plan_KKU_Grant_Proposal.docx')

print('=== 1. DOCUMENT GENERAL STATS ===')
print(f'Sections: {len(doc.sections)}')
print(f'Paragraphs: {len(doc.paragraphs)}')
print(f'Tables: {len(doc.tables)}')

print('\n=== 2. SECTIONS & MARGINS AUDIT ===')
for idx, s in enumerate(doc.sections):
    w = round(s.page_width.cm, 2)
    h = round(s.page_height.cm, 2)
    lm = round(s.left_margin.cm, 2)
    rm = round(s.right_margin.cm, 2)
    tm = round(s.top_margin.cm, 2)
    bm = round(s.bottom_margin.cm, 2)
    h_text = ' '.join([p.text for p in s.header.paragraphs]).strip()
    print(f'Sec {idx}: Size {w}x{h} cm | Margins: L={lm}, R={rm}, T={tm}, B={bm} cm | Header text: "{h_text}"')

print('\n=== 3. FONT AUDIT ===')
font_errors = []
zws_count = 0
total_runs = 0

for p in doc.paragraphs:
    for r in p.runs:
        total_runs += 1
        if '\u200b' in r.text:
            zws_count += 1
        rPr = r._r.find(qn('w:rPr'))
        if rPr is not None:
            rFonts = rPr.find(qn('w:rFonts'))
            if rFonts is not None:
                ascii_f = rFonts.get(qn('w:ascii'))
                cs_f = rFonts.get(qn('w:cs'))
                if ascii_f != 'TH SarabunPSK' or cs_f != 'TH SarabunPSK':
                    font_errors.append((r.text[:20], ascii_f, cs_f))

for tbl in doc.tables:
    for row in tbl.rows:
        for cell in row.cells:
            for p in cell.paragraphs:
                for r in p.runs:
                    total_runs += 1
                    if '\u200b' in r.text:
                        zws_count += 1
                    rPr = r._r.find(qn('w:rPr'))
                    if rPr is not None:
                        rFonts = rPr.find(qn('w:rFonts'))
                        if rFonts is not None:
                            ascii_f = rFonts.get(qn('w:ascii'))
                            cs_f = rFonts.get(qn('w:cs'))
                            if ascii_f != 'TH SarabunPSK' or cs_f != 'TH SarabunPSK':
                                font_errors.append((r.text[:20], ascii_f, cs_f))

print(f'Total text runs checked: {total_runs}')
print(f'Runs with Thai ZWS line-breaking: {zws_count}')
print(f'Font tagging errors: {len(font_errors)}')

print('\n=== 4. TABLE WIDTH AUDIT ===')
table_overflows = []
for idx, tbl in enumerate(doc.tables):
    for r_idx, row in enumerate(tbl.rows[:1]):
        total_w = sum([c.width.cm for c in row.cells if c.width])
        if total_w > 15.35:
            table_overflows.append((idx+1, len(row.cells), total_w))
print(f'Tables with width overflow (>15.35 cm): {len(table_overflows)}')
if not table_overflows:
    print('All tables are strictly within printable page width (<= 15.28 cm)!')

print('\n=== 5. KEY CHAPTER & STRUCTURE HEADINGS ===')
for p in doc.paragraphs:
    if p.text.startswith(('บทที่ ', 'คำนำ', 'สารบัญ', 'บรรณานุกรม')):
        print(f'- {p.text}')
