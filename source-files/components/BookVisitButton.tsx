import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
};

const BookVisitButton: React.FC<Props> = ({ children = 'Book visit', className = '', ...rest }) => {
  return (
    <div className={className}>
      <button className="bv-button" {...rest}>
        {children}
      </button>

      {/* Scoped styles for the button to replicate the styled-components example */}
      <style>{`
        .bv-button{
          position: relative;
          padding: 10px 20px;
          border-radius: 25px;
          border: 1px solid rgba(255, 123, 0, 1);
          font-size: 14px;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 2px;
          background: transparent;
          color: #fd8802ff000ff;
          overflow: hidden;
          box-shadow: 0 0 0 0 transparent;
          transition: all 0.2s ease-in;
          cursor: pointer;
        }

        .bv-button:hover{
          background: rgb(234 88 12 / var(--tw-bg-opacity, 1));
          color: #fff;
          box-shadow: 0 0 30px 5px rgba(255, 146, 21, 1);
          transition: all 0.2s ease-out;
        }

        .bv-button::before{
          content: '';
          display: block;
          width: 0px;
          height: 86%;
          position: absolute;
          top: 7%;
          left: 0%;
          opacity: 0;
          background: #fff;
          box-shadow: 0 0 50px 30px #fff;
          transform: skewX(-20deg);
        }

        .bv-button:hover::before{
          animation: bv-shine 0.5s 0s linear;
        }

        @keyframes bv-shine{
          from{ opacity:0; left: 0%; }
          50%{ opacity:1; }
          to{ opacity:0; left: 100%; }
        }

        .bv-button:active{
          box-shadow: 0 0 0 0 transparent;
          transition: box-shadow 0.2s ease-in;
        }

      `}</style>
    </div>
  );
};

export default BookVisitButton;
