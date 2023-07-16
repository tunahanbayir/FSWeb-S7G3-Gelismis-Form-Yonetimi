import {useEffect, useState} from 'react';
import * as Yup from "yup";
import axios from 'axios';


const Form = ({addNewUser}) => {

    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        term:false,

    });
    const [formErrors, setFormErrors] = useState({
        name:"",
        email: "",
        password: "",
        term: ""
      });
      const [isValid, setIsValid] = useState(false);
    

    const formSchema = Yup.object().shape({
        name: Yup
        .string(), 
        email: Yup
          .string()
          .email("Geçerli bir eposta adresi değil.")
          .required("Eposta alanı boş bırakılamaz."),
        password: Yup
          .string()
          .required("Şifre alanı boş bırakılamaz.")
          .min(6, "Şifre en az 6 karakter olmalıdır."),
        term: Yup
          .boolean()
          .oneOf([true], "Kullanım şartlarını kabul etmeniz gerekmektedir.")
          
      });

    const handleInputChange = (e) => {
        const {name, value, checked, type} = e.target;
        if (type === "checkbox") {
            setUser({ ...user, [name]: checked });
        } else {
            setUser({ ...user, [name]: value });
        }
        Yup.reach(formSchema, name)
		.validate(type === "checkbox" ? checked : value)
		.then(valid => { setFormErrors({ ...formErrors, [name]: "" }); })
		.catch(err => { setFormErrors({ ...formErrors, [name]: err.errors[0] }); }); 

    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post("https://reqres.in/api/users", user)
        .then(res => {
            console.log(res.data);
            addNewUser(res.data);
        })
        .catch(err => {
            console.error(err);
        });
    };

    useEffect (()=>{
        formSchema
		.isValid(user)
		.then(valid => setIsValid(valid) );

        console.log("users: ", user);

    }, [user]);

    useEffect (() => {
        console.log("formErrors: ", formErrors);
    }, [formErrors]);

    return <form onSubmit={handleFormSubmit} >
        <p>
        <label>
            Ad Soyad:&nbsp;
            <input name="name" type="text" onChange={handleInputChange}/>
        </label>
        {formErrors.name && ( <div className="input-error-message">{formErrors.name}</div> )}
        </p>
        <p>
        <label>
            E-posta:&nbsp;
            <input name="email" type="text" onChange={handleInputChange}/>
        </label>
        {formErrors.email && ( <div className="input-error-message">{formErrors.email}</div>)}
        </p>
        <p>
        <label>
            Şifre:&nbsp;
            <input name="password" type="password" onChange={handleInputChange}/>
        </label>
        {formErrors.password && ( <div className="input-error-message">{formErrors.password}</div> )}
        </p>
        <p>
        <label>
            Kullanım Şartlarını Kabul Ediyorum.
            <input name="term" type="checkbox" onChange={handleInputChange}/>
        </label>
        {formErrors.term && ( <div className="input-error-message">{formErrors.term}</div> )}
        </p>

        <button type="submit" disabled={!isValid}>Gönder</button>
    </form>;
};

export default Form;
