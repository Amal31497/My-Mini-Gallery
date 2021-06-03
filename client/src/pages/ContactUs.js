import React from 'react';
import emailjs from 'emailjs-com';



export default function ContactUs() {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_6g7b619', 'template_53h2tap', e.target, 'user_1kyBGesYrl4Kyg57ATuXk')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
  }

  return (
    <div>
<h5>You can contact me here</h5>
    
    <form className=" col-8 contact-form  py-5 "  onSubmit={sendEmail}>

      <div className="col-10 form-group pt-2 flex-row ms-auto" >
      <label>Name</label>
      <br/>
      <input type="text" name="name" />
      </div>
      
      
      <div className="col-10 form-group pt-2 flex-row ms-auto" >
      <label>Email</label>
      <br/>
      <input type="email" name="email" />

      </div>
      
      
      <div className="col-10 form-group pt-2 ms-auto" >
      <label>Message</label>
      <br/>
      <textarea name="message" />
      </div>
      <div className=" col-10 ms-auto " >
      <input type="submit" value="Send Message" />

      </div>
      
    </form>
    </div>
      );
}

