
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
//import { ReactComponent as Icon }  from "./logo_clara.svg";
import Logo from "./logo.png"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import './FormDemo.css';

function Signin() {
  const navigate = useNavigate()

  const { signIn } = useContext(AuthContext)
  const { signed } = useContext(AuthContext)
  console.log('na pagina login signed é:' + signed)
  const { register, handleSubmit, reset, setValue/*, formStates:{erros}*/ } = useForm();

  const form = async (formContent) => {
    await signIn(formContent)
  }
  const changePassword = (value) => {
    setValue('senha', value)
  }
  //
  if (signed) {
    navigate('/')
  } else {
    return (
      < >
      <div style={{position:'absolute',top:'0px',left:'0px'}}>
        <section className='page-login-background-section'>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>
          <span className="page-login-background-section-span" ></span>


          <div className="signin">

            <div className="content">
            <img src={Logo} style={{width:'70%'}}></img>
              <h2>Seja bem-vindo!</h2>

              <div className="form">

                <form onSubmit={handleSubmit(form)} className="p-fluid w-form" >
                  <div className="p-fluid grid">
                    <div className="field w-field col-12 md:col-12">
                      <label className="font-medium text-900">Email de acesso:</label>
                      <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                          <i className="pi pi-user"></i>
                        </span>
                        <InputText {...register("email")} />
                      </div>
                    </div>
                    <div className="field w-field col-12 md:col-12">
                      <label className="font-medium text-900">Senha:</label>
                      <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                          <i className="pi pi-pencil"></i>
                        </span>
                        <Password onChange={(e) => { changePassword(e.target.value) }} toggleMask style={{ width: '90%' }} />
                      </div>
                    </div>
                    <div className="field w-field col-12 md:col-12">
                      <Button type='submit' label="Entrar" icon="pi pi-lock-open" iconPos='right' className="w-form-button" />
                    </div>
                  </div>
                </form>

              </div>

            </div>

          </div>

        </section>





        </div>
      </>
    );
  }
}

export default Signin