import json,math,sys
secs=json.load(open('/home/claude/mag/secs.json'))
cx,cy=495,408;RN=1300
soft=float(sys.argv[1]) if len(sys.argv)>1 else 0
def hx(c):return '#%02x%02x%02x'%tuple(c)
defs=[];polys=[]
for n,a0,a1,s in secs:
  # сглаживание стопов скользящим средним по 3 (убирает шум выборки)
  sm=[]
  for i in range(len(s)):
    w=s[max(0,i-1):i+2];sm.append((s[i][0],[sum(c[1][k] for c in w)/len(w) for k in range(3)]))
  stops=''.join(f'<stop offset="{r/RN:.4f}" stop-color="{hx([round(v) for v in c])}"/>' for r,c in sm[::1])
  defs.append(f'<radialGradient id="g{n}" gradientUnits="userSpaceOnUse" cx="{cx}" cy="{cy}" r="{RN}">{stops}</radialGradient>')
  pts=[(cx,cy)]
  for a in (a0-0.3,(a0+a1)/2,a1+0.3):
    pts.append((cx+4000*math.cos(math.radians(a)),cy+4000*math.sin(math.radians(a))))
  polys.append(f'<path fill="url(#g{n})" d="M'+' L'.join(f'{x:.1f},{y:.1f}' for x,y in pts)+'Z"/>')
svg=f'<svg class="rays" viewBox="0 0 1440 908" preserveAspectRatio="xMinYMin slice" aria-hidden="true"><defs>{"".join(defs)}</defs>{"".join(polys)}</svg>'
open('/home/claude/mag/part_rays.svg','w').write(svg);print(len(svg))
