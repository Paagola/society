import sys
from PIL import Image
i=sys.argv[1]
a=Image.open(f'_ref/ref{i}.png').convert('RGB').resize((390,844))
b=Image.open(f'_cmp/f{i}.png').convert('RGB').resize((390,844))
c=Image.new('RGB',(390*3+20,844),'white')
c.paste(a,(0,0)); c.paste(b,(400,0)); c.paste(Image.blend(a,b,0.5),(800,0))
c.save(r'C:\Users\victo\AppData\Local\Temp\claude\c--Users-victo-PANGO-D-A-M-tfg\f6b3bcf5-04d3-4e8e-8d0c-088be1d129b0\scratchpad\cmp.png')
