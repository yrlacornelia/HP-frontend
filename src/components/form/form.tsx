import styles from './form.module.css'

type FormProps = {
    handleSubmit: any;
    csrfToken: string;
};
const FormComp : React.FC<FormProps> = ({  handleSubmit, csrfToken }) => {
    return ( <>
           <form className='flex flex-col w-full gap-6'  onSubmit={handleSubmit}>
            {/* <div className='flex flex-col'>
                <label className={styles.label} htmlFor="username">Username</label>
                <input
           style={{ color: 'white' }}
                className={styles.input}
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    
                />
            </div> */}
            <input type="hidden" name="_csrf" value={csrfToken} />

            <button className='m-auto mt-5 border bg-white text-black w-full py-3' type="submit">Login</button>
   
       
   </form> </> );
}
 
export default FormComp;