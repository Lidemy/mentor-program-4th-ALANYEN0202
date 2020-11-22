/* eslint-disable import/no-unresolved, react/react-in-jsx-scope, jsx-a11y/label-has-for */
/* eslint-disable no-plusplus, react/jsx-filename-extension, react/prop-types */
/* eslint-disable no-unused-vars, object-curly-newline, jsx-a11y/label-has-associated-control */

import { useState, useEffect } from 'react';
import useInput from './useInput';

function InputConfirm({ className, formName, name, placeholder, value, onChange, errorText }) {
  return (
    <div className={`${className} ${formName === '' ? '' : 'hide-error'}`}>
      <input type="text" name={name} placeholder={placeholder} value={value} onChange={onChange} />
      <div className="error">{errorText}</div>
    </div>
  );
}

function RadioConfirm({ className, formName, name, onChange, errorText, option }) {
  return (
    <div className={`${className} ${formName === '' ? '' : 'hide-error'}`}>
      <label>
        <input type="radio" name={name} value="inBed" onChange={onChange} checked={option === 'inBed'} />
        躺在床上用想像力實作
      </label>
      <label>
        <input type="radio" name={name} value="inPhone" onChange={onChange} checked={option === 'inPhone'} />
        趴在地上滑手機找現成的
      </label>
      <div className="error">{errorText}</div>
    </div>
  );
}

function isConfirmForm(form) {
  const { nick, email, phone, how } = form;
  if (nick && email && phone && how) return true;
  return false;
}

export default function Form() {
  const [form, setForm] = useState({});
  const { value: nick, setValue: setNick, handleChange: handleNickChange } = useInput();
  const { value: email, setValue: setEmail, handleChange: handleEmailChange } = useInput();
  const { value: phone, setValue: setPhone, handleChange: handlePhoneChange } = useInput();
  const { value: how, setValue: setHow, handleChange: handleHowChange } = useInput();
  const { value: advise, setValue: setAdvise, handleChange: handleAdviseChange } = useInput();

  const [option, setOption] = useState('inBed');

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({
      nick,
      email,
      phone,
      option,
      how,
      advise,
    });
  };
  useEffect(() => {
    if (isConfirmForm(form)) {
      return alert(`提交完成！ ${JSON.stringify(form)}`);
    }
    return console.log('no empty!');
  }, [form]);

  return (
    <form className="form__data" onSubmit={handleSubmit}>
      <div className="wrapper">
        <h2 className="nick">暱稱</h2>
        <InputConfirm className="check__nick required" formName={form.nick} name="nick" placeholder="您的暱稱" value={nick} onChange={handleNickChange} errorText="請輸入暱稱" />
        <h2 className="email">電子郵件</h2>
        <InputConfirm className="check__email required" formName={form.email} name="email" placeholder="您的電子郵件" value={email} onChange={handleEmailChange} errorText="請輸入電子信箱" />
        <h2 className="phone">手機號碼</h2>
        <InputConfirm className="check__phone required" formName={form.phone} name="phone" placeholder="您的手機號碼" value={phone} onChange={handlePhoneChange} errorText="請輸入手機號碼" />
      </div>
      <div className="wrapper">
        <h2 className="type">
          報名類型
        </h2>
        <RadioConfirm className="check__box required" formName={form.option} name="phone" onChange={handleOptionChange} errorText="請擇一" option={option} />
        <h2 className="question">怎麼知道這個活動的？</h2>
        <InputConfirm className="check__how required" formName={form.how} name="how" placeholder="您的回答" value={how} onChange={handleHowChange} errorText="請輸入資料" />
      </div>
      <div className="wrapper">
        <div className="other">
          <h4>其他</h4>
          <p>
            對活動的一些建議
          </p>
          <input type="text" placeholder="您的回答" name="advise" value={advise} onChange={handleAdviseChange} />
        </div>
        <input type="submit" className="submit" />
        <p className="note">請勿透過表單送出您的密碼。</p>
      </div>
    </form>
  );
}
