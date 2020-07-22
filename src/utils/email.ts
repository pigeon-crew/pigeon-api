import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
sgMail.setApiKey(SENDGRID_API_KEY);

// eslint-disable-next-line import/prefer-default-export
export class Email {
  private static instance: Email;

  // eslint-disable-next-line class-methods-use-this
  public sendTemplate(email: string) {
    const msg = {
      to: email,
      from: 'leyton_ho@brown.edu',
      subject: 'Welcome to Pigeon',
      text: 'Sparl great conversations with friends through link sharing',
      html: '<strong>Testing email</strong>',
    };
    sgMail.send(msg);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
}
