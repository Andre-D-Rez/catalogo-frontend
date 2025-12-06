import React from 'react';
import styles from './MainStyle.module.css'

type MainStyleProps = {
    children?: React.ReactNode; 
} & React.ComponentProps<'div'>;

const MainStyle: React.FC<MainStyleProps> = ({children}) => {
  return (
    <div 
      className='min-h-screen flex justify-center items-center pt-16 sm:pt-20 pb-8 px-3 sm:px-4'>
      <div 
        id={styles["container"]} 
        className='bg-contain rounded-xl bg-transparent shadow-xl max-w-6xl w-full p-6 sm:p-8'
      >
        {children}
      </div>
    </div>
  );
}

export default MainStyle;
