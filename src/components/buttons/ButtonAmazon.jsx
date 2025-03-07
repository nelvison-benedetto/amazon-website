import styles from './ButtonAmazon.module.css';

export default function ButtonAmazon({children, type='button'}){  //type default is 'button', in case u don't pass the type here 
    //lesson 102 x crreare un indice key-value(nome classe completo) quindi a questo comp viene passata la chiave, e lui applica la classe giusta
    
    return(
        <>
            <button className={styles['amazon-btn']} type={type}>
                {children}
            </button>
        </>
    );
}