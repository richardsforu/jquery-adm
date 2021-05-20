function f1(){
   
    /*
    // how to create an element in java scriptt?
    let div=document.createElement('div')
    let i1=document.createElement('input')
    let d1=document.querySelector("#d1");
    let d2=document.querySelector("#d2");

    div.innerHTML='<p>New Paragraph Data </p>';

    d1.appendChild(div);
    d2.appendChild(i1);

    */


    let name=document.getElementById('fname');
    let d1=document.querySelector("#d1");


    //alert(name.value);

    d1.innerHTML=name.value;


}