import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import getData from'../../api/api'
import styles from './autorizationPage.module.css'

export default function AuthorizationPage() {

    const navigate = useNavigate()
    const [error, setError]=useState('')
    const errorText='id сайта должен содержать 24 символа'
    const [inputSiteId, setInputSiteId]=useState('')
    const inputSiteIdLength:Array<String> =inputSiteId.split('')
    
    useEffect(()=>{setError('')},[])
 
    return (
     <div className={styles.content}>
      <h1>LeadHit</h1>
      <input
      onClick={()=>{setError('')}}
      className={styles.content__input}
      value={inputSiteId}
      onChange={(e)=>{
        setError('')
        setInputSiteId(e.target.value)}}
      placeholder='Введите id сайта' 
      type="text" />
      <button 
      className={styles.content__button}
      onClick={()=>{inputSiteIdLength.length===24?getData(navigate,inputSiteId):setError(errorText)}} type='button'> Войти </button>
      {error&&<span 
      className={styles.content__span}
      >{error}</span>}
     </div>
    )
  }