import base64,json,sys
import os
D=os.path.dirname(os.path.abspath(__file__))+'/'
r=lambda f:open(D+f,encoding='utf8').read()
import re as _r
RAD={}  # 19.11: скругления в исходниках уже итоговые (lend-radius.py)
def rad(css):return _r.sub(r'(border-radius:)([^;}!]+)',lambda m:m.group(1)+_r.sub(r'\b(\d+)px',lambda n:str(RAD.get(int(n.group(1)),int(n.group(1))))+'px',m.group(2)),css)
head=rad(r('part_head.html'))+r('part_tokens.css')+rad(r('part_rest.css'))+rad(r('part_prog.css'))+r('hdr_anchor.css')+rad(r('part_v8.css'))+rad(r('part_v15.css'))+r('part_n2.css')+r('part_pick.css')+r('part_mob.css')+'</style></head><body>'
body='<div class="frame"><div class="scrim2"></div>'+r('hdr_anchor.html')+r('part_hero.html')+r('part_rest.html')+'</div>'
js=r('hdr_anchor.js')+r('part_herojs.js')+r('part_dd.js')+r('part_top.js')+r('part_n2.js')+r('part_rest.js').replace('%PROGS%',json.dumps(json.load(open(D+'progs2.json')),ensure_ascii=False))
# MENU_CUR: снято 17.11 вместе с шапкой каталога (см. _hdr_katalog/README.md)
js+=r('part_pick.js')+r('part_mob.js')
js=js
html=head+body+'<script>'+('window.RAYS_PICK=1;' if '--pick' in sys.argv else '')+js+'</script></body></html>'
html=html.replace('%RAYS%',r('part_rays.svg'))
import re as _re
html=html.replace('%RAYS2%',_re.sub(r'(id="|url\(#)g',r'\1f',r('part_rays.svg')).replace('class="rays"','class="rays3"').replace('xMinYMin slice','xMidYMin slice'))
html=html.replace('%RAYS3%',_re.sub(r'(id="|url\(#)g',r'\1h',r('part_rays.svg')).replace('class="rays"','class="rays4"').replace('xMinYMin slice','xMidYMid slice'))
html=html.replace('%FAN1%',r('part_fan1.svg')).replace('%FAN2%',r('part_fan2.svg'))
html=html.replace('%LOGO%',r('logo.svg').replace('fill="#E50046"','fill="currentColor"'))
inline='--inline' in sys.argv
if inline:
    for f in ['bounded.woff2','golos-text-cyrillic-wght-normal.woff2','golos-text-latin-wght-normal.woff2']:
        b=base64.b64encode(open(D+'fonts/'+f,'rb').read()).decode()
        html=html.replace('url(fonts/'+f+')','url(data:font/woff2;base64,'+b+')')
open(D+('out/index.html' if inline else 'index.html'),'w',encoding='utf8').write(html)
print(len(html))
