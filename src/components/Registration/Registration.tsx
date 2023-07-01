import "./Registration.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { selectUsers, setUsersData } from "../../store/slices/users/usersSlice";
import { fetchUsers } from "../../store/slices/users/usersAPI";
import { useAppDispatch } from "../../store/hooks";

const schema = Yup.object().shape({
    name:Yup.string().typeError("It should be a string").required("username is a required field"),
    email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
    password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
    confirmPassword:Yup.string().typeError("It should be a string").oneOf([Yup.ref("password")], "doesn't match").required("Password is a required field"),
});

function Registration() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {usersData} = useSelector(selectUsers)
    console.log(usersData);
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('')
    useEffect(() => {
      dispatch(fetchUsers())
    }, [])
    
 
  
//     const response =  axios.post('https://rapidapi.com/learn/api/rest', {
// 	    name: 'John',
// 	    email: 'Doe',
//   });
// console.log(response.data);
///-----------------------------------
        // axios.post({
        //     method: 'POST',
        //     baseURL: 'http://api.fakeshop-api.com',
        //     url: '/users/signup',
        //     userData:{
        //         email,
        //         password,
        //     },
        //   })
        //     .then(({ data }) => {
        //       setUserData(data)
        //         localStorage.setItem('token', data.token)
        //         console.log(data);
        //     })
        //     .catch(err => console.dir(err))
    // }

  return (
    <div className="page">
      <Formik
        validationSchema={schema}
        initialValues={{ name:"", email: "", password: "", confirmPassword:"" }}
        
        onSubmit={(values) => {
            // axios.post('https://dummyjson.com/users/',//delete it
            //     //  {
            //   	//     name: values.name,
            //     //     password: values.password,
            //  	  //     email: values.email,
            //     //  }
            //      )
            // .then(({data})=>{
              // console.log(data.users);
              if(usersData.every(el=> el.firstName.toLowerCase() !== values.name.toLowerCase() && el.password !== values.password && el.email !== values.email)){
                dispatch(setUsersData(
                    {
                      firstName:values.name,
                      email:values.email,
                      password:values.password
                    }
                    ))
               navigate('/login')
              }else{
                alert('user is already exist')
              }
            // })
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="reg">
            <div className="form">
              <form noValidate onSubmit={handleSubmit}>
                <span>Registration</span>
              {/* Passing formik parameters like handleChange, values, ... to input properties */}
              <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="Enter username"
                    className="form-control"
                    />
                    <p className="error">
                        {errors.name && touched.name && errors.name}
                    </p>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email id / username"
                  className="form-control inp_text"
                  id="email"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.email && touched.email && errors.email}
                </p>
                 {/* Passing formik parameters like handleChange, values, ...  to input properties */}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                 {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                <input 
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        placeholder="Confirm password"
                        className="form-control"
                    />
                    <p className="error">
                        {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                    </p>
                <button type="submit">Reg</button>
                <Link to="/login"><button style={{backgroundColor:'#7e8ff4'}}>Login</button></Link>
                <button style={{color:'yellow'}} onClick={()=>navigate("/")}>Back</button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
export default Registration