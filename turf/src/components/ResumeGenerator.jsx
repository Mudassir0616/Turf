import React, { useState, useRef } from "react";

import html2pdf from "html2pdf.js";

import axios from "axios";

function ResumeGenerator() {
  const [resumePDF, setResumePDF] = useState(null);
  const resumeRef = useRef(null);
  const [loader, setLoader] = useState(false);

  // useEffect(() => {
  // 	const container = resumeRef.current;
  // 	let instance, PSPDFKit;
  // 	(async function () {
  // 		PSPDFKit = await import('pspdfkit');
  // 		instance = await PSPDFKit.load({
  // 			// Container where PSPDFKit should be mounted.
  // 			container,
  // 			// The document to open.
  // 			document: 'resume',
  // 			// Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
  // 			baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
  // 		});
  // 	})();

  // 	return () => PSPDFKit && PSPDFKit.unload(container);
  // }, []);

  // const onButtonClick = () => {
  //   // using Java Script method to get PDF file
  //   fetch(resumeRef.current).then(response => {
  //     response.blob().then(blob => {
  //       // Creating new object of PDF file
  //           const fileURL = window.URL.createObjectURL(blob);
  //           // Setting various property values
  //           let alink = document.createElement('a');
  //           alink.href = fileURL;
  //           alink.download = 'SamplePDF.pdf';
  //           alink.click();
  //         })
  //       })
  //     }

  //     const downloadPDF = () => {
  //       const doc = new jsPDF({
  //         orientation: 'portrait',
  //         unit: 'mm',
  //         format: [297, 210] // A4 page size in mm
  //       });

  //       const opt = {
  //         margin: [0.2, 0.2, 0.3, 0.2],
  //       }

  //       // Get the resume template element
  //       const resumeTemplate = resumeRef.current;

  //       // Convert the resume template element to a canvas
  //       html2canvas(resumeTemplate, {allowTaint: true, useCORS: true, scale: 2.6 }).then((canvas) => {
  //         const imgData = canvas.toDataURL('image/jpeg', 0.1);

  //         // Set the image size and position to fit the page
  //         const pageWidth = doc.internal.pageSize.width;
  //         const pageHeight = doc.internal.pageSize.height;
  //         var imgHeight = canvas.height * pageWidth / canvas.width;
  //         var heightLeft = imgHeight;
  //         var position = 0;

  //         // Add the canvas image to the PDF document
  //         doc.addImage(imgData, 'JPEG', 0, position, pageWidth, imgHeight );
  //         heightLeft -= pageHeight

  //         while (heightLeft >= 0) {
  //           position = heightLeft - imgHeight
  //           doc.addPage();
  //           doc.addImage(imgData, 'JPEG', 0, position, pageWidth, imgHeight);
  //           heightLeft -= pageHeight
  //         }

  //         doc.save('resume.pdf');
  //       });
  //     };

  //   const download = () => {
  //     window.scrollTo(0, 0);
  //     setTimeout(() => {
  //         setTimeout(() => {
  //             setLoader(true);
  //         }, 100);
  //         const resumeTemplate = resumeRef.current;
  //         html2canvas(resumeTemplate).then(canvas => {
  //             const imgData = canvas.toDataURL('image/png');
  //             const imgWidth = 190;
  //             const pageHeight = 290;
  //             const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //             let heightLeft = imgHeight;
  //             const doc = new jsPDF('pt', 'mm');
  //             let position = 0;
  //             doc.addImage(imgData, 'PNG', 10, 0, imgWidth, imgHeight + 25);
  //             heightLeft -= pageHeight;
  //             while (heightLeft >= 0) {
  //                 position = heightLeft - imgHeight;
  //                 doc.addPage();
  //                 doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight + 15);
  //                 heightLeft -= pageHeight;
  //             }
  //             doc.save('download.pdf');
  //             setLoader(false);
  //         });
  //     }, 1000);
  // };

  function download_pdf() {
    var element = document.getElementById("resume");
    var document_name = "test";
    var opt = {
      margin: [0, 0, 0.5, 0],
      filename: document_name + ".pdf",
      image: { type: "jpeg", quality: 0.1 },
      // Added after option to add spacing after page break
      pagebreak: { avoid: "tr", mode: "css", before: "#page2el" },
      // pagebreak: { mode: 'avoid-all', before: '#page2el' },
      html2canvas: { scale: 3, useCORS: true, dpi: 192, letterRendering: true },
      // Added putTotalPages option to add page number
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
        putTotalPages: true,
      },
    };

    html2pdf().set(opt).from(element).save();

    //     var zip = new JSZip();
    // zip.file(
    //   "myFile.pdf",
    //   html2pdf()
    //     .from(element)
    //     .set(opt)
    //     .output('blob')
    // );
    // zip
    //   .generateAsync({
    //     type: "blob",
    //     compression: "DEFLATE",
    //     compressionOptions: { level: 9 }
    //   })
    //   .then(res => saveAs(res, "myFolder.zip"));
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    // SpeechRecognition.stopListening();
    // if (isListening)
    //   props.set({ question: prompt, question_time: moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"), response: '', response_time: '', mode: "audio" }, true)
    // else {
    //   props.set({ question: prompt, question_time: moment().utcOffset("+05:30").format("YYYY-MM-DD HH:mm:ss"), response: '', response_time: '', mode: "text" }, true)
    // }
    // setisListening(false)

    // resetTranscript();

    const query = "Hello";
    // setPrompt("")

    await axios
      .post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt: query,
          max_tokens: 1000,
          temperature: 0,
          top_p: 1,
          n: 1,
          stream: false,
          logprobs: null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },
        }
      )
      .then((res) => {
        // console.log("here in msgpost response", response)

        console.log("here in axios", res.data.choices[0].text);
      });
  };

  return (
    <div style={{ display: "flex", background: "#F5F5F5" }}>
      <div>
        <button onClick={submitHandler} style={{ margin: "10px" }}>
          Generate Resume PDF
        </button>

        {/* <ReactToPrint
        trigger={() => (
          <button>Download</button>
        )}
        content={()=> resumeRef.current}/> */}
      </div>
      <div ref={resumeRef} id="resume">
        {/* Render your resume template component here */}
        {/* <TemplateOne/> */}
      </div>
    </div>
  );
}

export default ResumeGenerator;
