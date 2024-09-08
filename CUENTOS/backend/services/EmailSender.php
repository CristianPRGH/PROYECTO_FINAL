<?php

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'C:/xampp/htdocs/MySites/PROYECTO_FINAL/vendor/autoload.php';

class EmailSender {

    private $mail = null;
    private $from = 'foap408@gmail.com';
    private $pass = 'dyrv alyq ojiq acyd';
    private $toMail = null;
    private $toUsername = null;
    private $mailBody = null;
    private $subject = null;

    public function __construct()
    {
        //Create an instance; passing `true` enables exceptions
        $this->mail = new PHPMailer(true);
    }

    public function sendEmailHandler($toMail, $toUsername, $body, $subject)
    {
        $this->toMail       = $toMail;
        $this->toUsername   = $toUsername;
        $this->mailBody     = $body;
        $this->subject      = $subject;

        return $this->sendEmail();
    }

    private function sendEmail()
    {
        try {
            //Server settings
            $this->mail->SMTPDebug = SMTP::DEBUG_OFF;                      //Enable verbose debug output
            $this->mail->isSMTP();                                            //Send using SMTP
            $this->mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
            $this->mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $this->mail->Username   = $this->from;                            //SMTP username
            $this->mail->Password   = $this->pass;                               //SMTP password
            $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $this->mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $this->mail->setFrom($this->from, 'Administrador');
            $this->mail->addAddress($this->toMail, $this->toUsername);     //Add a recipient

            //Content
            $this->mail->isHTML(true);                                  //Set email format to HTML
            $this->mail->Subject = $this->subject;
            $this->mail->Body    = $this->mailBody;
            // $this->mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $this->mail->send();
            return array(
                "error" => 0,
                "msg" => 'Email enviado. Por favor revise su correo.'
            );

        } catch (Exception $e) {
            return array(
                "error" => 1,
                "msg" => "El email no ha podido ser enviado."
            );
            // echo "Message could not be sent. Mailer Error: {$this->mail->ErrorInfo}";
        }
    }
}