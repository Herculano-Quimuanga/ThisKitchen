/**
 * ThisKitchen - Reservation Processing & PDF Generation
 */

document.addEventListener('DOMContentLoaded', () => {
    const submitReservBtn = document.getElementById('SubmitReserv');
    if (!submitReservBtn) return;

    submitReservBtn.addEventListener('click', () => {
        const inputFields = document.querySelectorAll('.InputCamp');
        const errorSpans = document.querySelectorAll('.error-reserv');
        const warningSpan = document.querySelector('.Warning');
        let isValid = true;

        errorSpans.forEach(span => span.textContent = '');
        if (warningSpan) warningSpan.textContent = '';

        // 1. Name
        const nameVal = inputFields[0] ? inputFields[0].value.trim() : '';
        if (nameVal === '') {
            isValid = false;
            if (errorSpans[0]) errorSpans[0].textContent = 'Por favor, insira o seu nome!';
            if (inputFields[0]) inputFields[0].focus();
        } else if (nameVal.length < 5) {
            isValid = false;
            if (errorSpans[0]) errorSpans[0].textContent = 'Insira o seu nome completo!';
            if (inputFields[0]) inputFields[0].focus();
        }

        // 2. Email
        const emailVal = inputFields[1] ? inputFields[1].value.trim() : '';
        if (emailVal === '') {
            if (isValid) { isValid = false; if (inputFields[1]) inputFields[1].focus(); }
            if (errorSpans[1]) errorSpans[1].textContent = 'Por favor, insira o seu email!';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
            if (isValid) { isValid = false; if (inputFields[1]) inputFields[1].focus(); }
            if (errorSpans[1]) errorSpans[1].textContent = 'Insira um email válido!';
        }

        // 3. Phone (accepts standard or Angolan formats 9xx xxx xxx or 9 digits)
        const phoneVal = inputFields[2] ? inputFields[2].value.trim().replace(/\s+/g, '') : '';
        if (phoneVal === '') {
            if (isValid) { isValid = false; if (inputFields[2]) inputFields[2].focus(); }
            if (errorSpans[2]) errorSpans[2].textContent = 'Por favor, insira o seu telemóvel!';
        } else if (!/^(?:\+?244)?9\d{8}$/.test(phoneVal) && phoneVal.length < 9) {
            if (isValid) { isValid = false; if (inputFields[2]) inputFields[2].focus(); }
            if (errorSpans[2]) errorSpans[2].textContent = 'Insira um telemóvel válido (+244 9xx xxx xxx)!';
        }

        // 4. Persons count
        const personVal = inputFields[3] ? parseInt(inputFields[3].value, 10) : 0;
        if (!personVal || isNaN(personVal) || personVal < 1) {
            if (isValid) { isValid = false; if (inputFields[3]) inputFields[3].focus(); }
            if (errorSpans[3]) errorSpans[3].textContent = 'Por favor, informe o número de lugares!';
        } else if (personVal > 20) {
            if (isValid) { isValid = false; if (inputFields[3]) inputFields[3].focus(); }
            if (errorSpans[3]) errorSpans[3].textContent = 'Para grupos acima de 20 lugares, contacte-nos diretamente.';
        }

        // 5. Date
        const dateVal = inputFields[4] ? inputFields[4].value : '';
        if (!dateVal) {
            if (isValid) { isValid = false; if (inputFields[4]) inputFields[4].focus(); }
            if (errorSpans[4]) errorSpans[4].textContent = 'Por favor, selecione uma data!';
        }

        // 6. Time
        const timeVal = inputFields[5] ? inputFields[5].value : '';
        if (!timeVal) {
            if (isValid) { isValid = false; if (inputFields[5]) inputFields[5].focus(); }
            if (errorSpans[5]) errorSpans[5].textContent = 'Por favor, escolha um horário!';
        }

        const specialReq = inputFields[6] ? inputFields[6].value.trim() : 'Nenhuma';

        if (isValid) {
            // Close modal
            const modalReserv = document.querySelector('.modal-reserv');
            if (modalReserv) modalReserv.classList.remove('show');
            document.body.classList.remove('modal-active');

            // Show loading overlay
            const loadingLatter = document.getElementById('LoadingLatter');
            if (loadingLatter) {
                loadingLatter.classList.add('show');
                const loadingText = loadingLatter.querySelector('h2');
                if (loadingText) loadingText.textContent = 'A confirmar a sua reserva e a gerar o comprovativo...';
            }

            setTimeout(() => {
                if (loadingLatter) loadingLatter.classList.remove('show');

                // Generate PDF if jsPDF is available
                if (window.jspdf && window.jspdf.jsPDF) {
                    try {
                        const { jsPDF } = window.jspdf;
                        const doc = new jsPDF();
                        const pageWidth = doc.internal.pageSize.getWidth();

                        // Header brand background
                        doc.setFillColor(230, 57, 70); // #E63946
                        doc.rect(0, 0, pageWidth, 35, 'F');

                        doc.setFont('Helvetica', 'bold');
                        doc.setTextColor(255, 255, 255);
                        doc.setFontSize(22);
                        doc.text('ThisKitchen - Restaurante', pageWidth / 2, 18, { align: 'center' });

                        doc.setFont('Helvetica', 'normal');
                        doc.setFontSize(11);
                        doc.text('Luanda - Camama I, Frente aos Bombeiros | Tel: +244 923-542-671', pageWidth / 2, 27, { align: 'center' });

                        // Subtitle
                        doc.setTextColor(30, 30, 30);
                        doc.setFont('Helvetica', 'bold');
                        doc.setFontSize(16);
                        doc.text('COMPROVATIVO DE RESERVA DE MESA', pageWidth / 2, 50, { align: 'center' });

                        // Reference code
                        const refCode = 'TK-' + Math.floor(100000 + Math.random() * 900000);
                        doc.setFont('Helvetica', 'normal');
                        doc.setFontSize(10);
                        doc.setTextColor(113, 114, 117);
                        doc.text(`Código da Reserva: ${refCode}  |  Emitido em: ${new Date().toLocaleDateString('pt-PT')}`, pageWidth / 2, 57, { align: 'center' });

                        // Details table
                        const tableColumn = ['Campo', 'Detalhes da Reserva'];
                        const tableRows = [
                            ['Nome do Cliente', nameVal],
                            ['Endereço de Email', emailVal],
                            ['Telemóvel', phoneVal],
                            ['Número de Lugares', `${personVal} ${personVal === 1 ? 'pessoa' : 'pessoas'}`],
                            ['Data da Reserva', dateVal],
                            ['Horário Previsto', timeVal],
                            ['Pedidos Especiais', specialReq || 'Sem observações adicionais']
                        ];

                        if (doc.autoTable) {
                            doc.autoTable({
                                startY: 66,
                                head: [tableColumn],
                                body: tableRows,
                                theme: 'striped',
                                styles: {
                                    font: 'Helvetica',
                                    fontSize: 10,
                                    textColor: [33, 37, 41],
                                    cellPadding: 6
                                },
                                headStyles: {
                                    fillColor: [230, 57, 70],
                                    textColor: [255, 255, 255],
                                    fontStyle: 'bold'
                                },
                                alternateRowStyles: {
                                    fillColor: [248, 249, 250]
                                },
                                margin: { left: 20, right: 20 }
                            });
                        }

                        // Footer note
                        const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : 150;
                        doc.setFontSize(10);
                        doc.setTextColor(100, 100, 100);
                        doc.text('Por favor apresente este comprovativo na receção do restaurante no dia da sua reserva.', pageWidth / 2, finalY, { align: 'center' });
                        doc.text('Tolerância de chegada: 15 minutos. Obrigado pela sua preferência!', pageWidth / 2, finalY + 7, { align: 'center' });

                        doc.save(`Comprovativo_Reserva_${refCode}.pdf`);
                    } catch (err) {
                        console.error('Erro ao gerar PDF:', err);
                    }
                }

                // Show on-screen confirmation toast/dialog
                let confirmToast = document.getElementById('ReservationConfirmationToast');
                if (!confirmToast) {
                    confirmToast = document.createElement('div');
                    confirmToast.id = 'ReservationConfirmationToast';
                    confirmToast.className = 'confirm-reservation-toast';
                    document.body.appendChild(confirmToast);
                }

                confirmToast.innerHTML = `
                    <div class="confirm-toast-card">
                        <div class="confirm-icon-wrap">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="28" height="28">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h3>Reserva Confirmada com Sucesso!</h3>
                        <p>Obrigado, <strong>${nameVal}</strong>! Sua mesa para <strong>${personVal} pessoas</strong> foi agendada para <strong>${dateVal} às ${timeVal}</strong>.</p>
                        <span class="pdf-note">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" style="vertical-align: middle; margin-right: 4px;">
                                <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>
                            </svg>
                            O seu comprovativo em PDF foi descarregado automaticamente.
                        </span>
                        <button type="button" class="button-main btn-close-confirm">Entendido</button>
                    </div>
                `;

                confirmToast.classList.add('show');
                const closeBtn = confirmToast.querySelector('.btn-close-confirm');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => {
                        confirmToast.classList.remove('show');
                    });
                }
                setTimeout(() => {
                    if (confirmToast) confirmToast.classList.remove('show');
                }, 8000);

                // Reset form fields
                inputFields.forEach(input => {
                    if (input.type !== 'date' && input.type !== 'time') input.value = '';
                });

            }, 1200);
        }
    });
});
