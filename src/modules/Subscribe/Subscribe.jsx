import './subscribe.scss';

export const Subscribe = () => (
  <section className="subscribe">
    <div className="container">
      <h2 className="subscribe__title section-title">Подпишись на&nbsp;рассылку</h2>
      <form className="subscribe__form">
        <input className="subscribe__input" type="email" name="email" placeholder="E-mail" />
        <button className="subscribe__btn" aria-label="Подписаться на рассылку" type="submit">
          <svg className="subscribe__icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.16669 6.66667C4.78502 6.66667 5.70835 6.05583 6.48335 5.4375C7.48335 4.6425 8.35585 3.6925 9.02169 2.60333C9.52085 1.78667 10 0.796667 10 0M10 0C10 0.796667 10.4792 1.7875 10.9784 2.60333C11.645 3.6925 12.5175 4.6425 13.5159 5.4375C14.2917 6.05583 15.2167 6.66667 15.8334 6.66667M10 0V20" stroke="white" />
          </svg>
        </button>
      </form>
    </div>
  </section>
);