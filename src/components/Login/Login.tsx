
import "./Login.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setCart } from "../../store/slices/cart/cartSlice";
import { selectUsers, setUserName } from "../../store/slices/users/usersSlice";
import { useAppDispatch } from "../../store/hooks";

const schema = Yup.object().shape({
  name:Yup.string().typeError("It should be a string").required("username is a required field"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

function Login() {
    const navigate = useNavigate()
    const dispatch=useAppDispatch()
    const {userCart, usersData} = useSelector(selectUsers)
    // console.log(usersData);
    
  return (
    <div className="page">
      <Formik
        validationSchema={schema}
        initialValues={{ name: "", password: "" }}
        onSubmit={(values,{resetForm})=> {
         console.log(usersData.some(el=>el.firstName === values.name && el.password === values.password));
              if(usersData.some(el=>el.firstName === values.name && el.password === values.password)){
                  dispatch(setUserName(values.name))
                  console.log('hello');
                  if(userCart.find(el=> el?.nr === values.name)?.user === undefined) {
                    console.log('undefined in Arr');
                  }else{
                    dispatch(setCart([//Creates array with the name of user;
                    ...(userCart.findLast((el) => el?.nr === values.name)?.user || []).map((el) => ({
                      ...el,
                      // price: el.price + el.price / el.count,
                    })),
                  ]))
                  }
                  console.log(userCart.findLast(el=> el?.nr === values.name)?.user);///find 1 elem gtnum
                  // console.log(cartItems);
                  console.log(values);
                  navigate("/")   
              }else{
                alert('wrong');
              }
         //resetForm() 
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
          <div className="login">
            <div className="form">
              <form noValidate onSubmit={handleSubmit}>
                <span>Login</span>
              {/* Passing formik parameters like handleChange, values, ... to input properties */}
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Enter username"
                  className="form-control inp_text"
                  id="email"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.name && touched.name && errors.name}
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
                <button type="submit">Login</button>
                <Link to="/registration"><button style={{backgroundColor:'#7e8ff4'}}>Reg</button></Link>
                <button style={{color:'yellow'}} onClick={()=>navigate('/')}>Back</button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
export default Login