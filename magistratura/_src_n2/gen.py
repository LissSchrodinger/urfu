from PIL import Image;import math,json,statistics as st,sys
im=Image.open('/home/claude/mag/ref/agency_site_1440.png').convert('RGB');W,H=im.size
cx,cy=495,408
E=[-88.5,6,32.8,65.8,92.8,195.5,271.5]  # рёбра по часовой (экран)
names='ABCDEF'
R=1300
def samp(a0,a1):
  out=[]
  for r in list(range(6,60,6))+list(range(60,R,30)):
    cs=[]
    a=a0+3
    while a<a1-3:
      x=cx+r*math.cos(math.radians(a));y=cy+r*math.sin(math.radians(a))
      if 0<=x<W and 0<=y<H and not (x>845 and y>688):
        p=im.getpixel((int(x),int(y)))
        if sum(p)<600 and max(p)-min(p)>40: cs.append(p)
      a+=1.5
    if len(cs)>=2: out.append((r,tuple(int(st.median(c[i] for c in cs)) for i in range(3))))
  return out
secs=[]
for i in range(6):
  a0=E[i] if i else 271.5-360
  a1=E[i+1]
  secs.append((names[i],a0,a1,samp(a0,a1)))
json.dump(secs,open('secs.json','w'))
for n,a0,a1,s in secs: print(n,round(a0,1),round(a1,1),len(s),s[0],s[len(s)//2],s[-1])
