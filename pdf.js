/* A minimal binary PDF writer. JPEG bytes are embedded without a network dependency. */
(function(root){
function buildPDF(pages, size='a4'){
 if(!pages.length) throw new Error('Add at least one page.');
 const enc=new TextEncoder(), parts=[], offsets=[0];let length=0;
 const put=x=>{const b=typeof x==='string'?enc.encode(x):x;parts.push(b);length+=b.length;};
 const obj=(id,body,stream)=>{offsets[id]=length;put(`${id} 0 obj\n${body}`);if(stream){put('\nstream\n');put(stream);put('\nendstream');}put('\nendobj\n');};
 put('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
 obj(1,'<< /Type /Catalog /Pages 2 0 R >>');
 obj(2,`<< /Type /Pages /Count ${pages.length} /Kids [${pages.map((_,i)=>`${3+i*3} 0 R`).join(' ')}] >>`);
 pages.forEach((p,i)=>{
  const id=3+i*3;const w=size==='a4'?595.28:p.width*0.75,h=size==='a4'?841.89:p.height*0.75;
  const margin=size==='a4'?24:0,scale=Math.min((w-2*margin)/p.width,(h-2*margin)/p.height),dw=p.width*scale,dh=p.height*scale;
  const content=enc.encode(`q\n${dw.toFixed(3)} 0 0 ${dh.toFixed(3)} ${((w-dw)/2).toFixed(3)} ${((h-dh)/2).toFixed(3)} cm\n/Im0 Do\nQ`);
  obj(id,`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${w} ${h}] /Resources << /XObject << /Im0 ${id+1} 0 R >> >> /Contents ${id+2} 0 R >>`);
  obj(id+1,`<< /Type /XObject /Subtype /Image /Width ${p.width} /Height ${p.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${p.bytes.length} >>`,p.bytes);
  obj(id+2,`<< /Length ${content.length} >>`,content);
 });
 const start=length,n=3+pages.length*3;put(`xref\n0 ${n}\n0000000000 65535 f \n`);for(let i=1;i<n;i++)put(`${String(offsets[i]).padStart(10,'0')} 00000 n \n`);
 put(`trailer\n<< /Size ${n} /Root 1 0 R >>\nstartxref\n${start}\n%%EOF\n`);return new Blob(parts,{type:'application/pdf'});
}
root.buildPDF=buildPDF;
})(globalThis);
