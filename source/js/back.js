document.getElementById('SubmitReserv').addEventListener('click', () =>{

    let InputCamp = document.querySelectorAll('.InputCamp');
    let ErroReserv = document.querySelectorAll('.error-reserv');
    let Warning = document.querySelector('.Warning');
    let validaSend = true;

    if(InputCamp[0].value === ''){
        validaSend = false;
        ErroReserv[0].textContent = "Por favor insira seu nome!";
    }else if(InputCamp[0].value.length < 8){
        validaSend = false;
        ErroReserv[0].textContent = "Insira seu nome completo!";
    }else{
        validaSend = true;
        ErroReserv[0].textContent = "";
    }

    if(InputCamp[1].value === ''){
        validaSend = false;
        ErroReserv[1].textContent = "Por favor insira seu email!";
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(InputCamp[1].value)){
        validaSend = false;
        ErroReserv[1].textContent = "Insira um email válido!";
    }else{
        validaSend = true;
        ErroReserv[1].textContent = "";
    }

    if(InputCamp[2].value === ''){
        validaSend = false;
        ErroReserv[2].textContent = "Por favor insira um telemóvel!";
    }else if(!/^9[2-7]\d{7}$/.test(InputCamp[2].value)){
        validaSend = false;
        ErroReserv[2].textContent = "Insira um telemóvel válido!";
    }else{
        validaSend = true;
        ErroReserv[2].textContent = "";
    }

    if(InputCamp[3].value === ''){
        validaSend = false;
        ErroReserv[3].textContent = "Por favor insira a quantidade";
    }else if(InputCamp[3].value > 6){
        validaSend = false;
        ErroReserv[3].textContent = "Quantidade inferior a 7!";
    }else{
        validaSend = true;
        ErroReserv[3].textContent = "";
    }

    if(InputCamp[4].value === ''){
        validaSend = false;
        ErroReserv[4].textContent = "Por favor insira uma data!";
    }else{
        ErroReserv[4].textContent = "";
        validaSend = true;
    }

    if(InputCamp[5].value === ''){
        validaSend = false;
        ErroReserv[5].textContent = "Por favor insira um horário!";
    }else{
        ErroReserv[5].textContent = "";
        validaSend = true;
    }

    if(validaSend){
        for(i = 0; i <= 5; i++){
            console.log(InputCamp[i].value);
        }

        document.querySelector('.modal-reserv').classList.toggle('show');

        let LoadingLatter = document.getElementById('LoadingLatter');

        LoadingLatter.classList.add('show'); 

        setTimeout( () =>{
            LoadingLatter.classList.remove('show');

            async function generatePDF() {
                const { jsPDF } = window.jspdf;
            
                const doc = new jsPDF();
            
                const imgElement = document.getElementById('imagem');
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
            
                canvas.width = imgElement.width;
                canvas.height = imgElement.height;
                context.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
            
                const imgData = canvas.toDataURL('image/png');
            
                const imgWidth = 60; 
                const imgHeight = (canvas.height / canvas.width) * imgWidth;
                const pageWidth = doc.internal.pageSize.getWidth();
                const imgX = (pageWidth - imgWidth) / 2;
            
                doc.addImage(imgData, 'PNG', imgX, 10, imgWidth, imgHeight);

                doc.setFont('Helvetica', 'bold'); 
                doc.setTextColor(21, 21, 21);
                doc.setFontSize(18);
                doc.text('Comprovativo de Reserva', pageWidth / 2, imgHeight + 20, { align: 'center' });
            
                const tableColumn = ['Campo', 'Valor'];
                const tableRows = [
                    ['Nome', InputCamp[0].value],
                    ['Email', InputCamp[1].value],
                    ['Telemóvel', InputCamp[2].value],
                    ['Lugares', InputCamp[3].value],
                    ['Data', InputCamp[4].value],
                    ['Hora', InputCamp[5].value]
                ];
            
                doc.setFontSize(18);
                doc.autoTable({
                    startY: imgHeight + 30,
                    head: [tableColumn],
                    body: tableRows,
                    theme: 'grid',
                    styles: {
                        font: 'Helvetica', 
                        textColor: [21, 21, 21], 
                        cellPadding: 5
                    },
                    headStyles: {
                        fillColor: [200, 200, 200],
                        textColor: [0, 0, 0],
                        fontStyle: 'bold'
                    }
                });
            
                doc.save('Comprovativo_Reserva.pdf');
            }            
    
            generatePDF();
        }, 4000);

    }

});