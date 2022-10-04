import { Mail } from "~/core/mail";
import { Email } from "~/core/email";
import { IMail } from "./ports";
import { InvalidParamError } from "~/errors";

const makeSut = () => {
  const mail = Mail;

  const emails = {
    incorrect: {
      emailFirst: "jhoedoe@mail",
      emailSecund: "yazaldefilimon.gmail.com",
    },
    correct: {
      emailFirst: "yazaldefilimon@gmail.com",
      emailSecund: "jhoedoe@gmail.com",
    },
  };
  const sender = Email.build({ email: emails.correct.emailFirst });
  const recipient = Email.build({ email: emails.correct.emailSecund });
  return {
    mail,
    emails,
    sender,
    recipient,
  };
};

describe("Mail", () => {
  it("Should return an content mail all data will is correct", () => {
    const { mail, emails, sender, recipient } = makeSut();
    if (sender.isLeft() || recipient.isLeft()) {
      console.error("Email return error");
      return null;
    }
    const mailParams: IMail = {
      sourceAddress: sender.value,
      destinationAddress: recipient.value,
      messageBody: "Hey, I am again",
      messageTitle: "Hello",
    };
    const result = mail.build(mailParams);
    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(mailParams);
  });
});
