import React, { useState } from 'react';
import axios from 'axios';
import * as PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import APP_ROUTES from '../../utils/constants';
import { useUser } from '../../lib/customHooks';
import { storeInLocalStorage } from '../../lib/common';
import { ReactComponent as Logo } from '../../images/Logo.svg';
import styles from './SignIn.module.css';

function SignIn({ setUser }) {
  const navigate = useNavigate();
  const { user, authenticated } = useUser();
  if (user || authenticated) {
    navigate(APP_ROUTES.DASHBOARD);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ error: false, message: '' });

  const signIn = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200 && response.data.token) {
        storeInLocalStorage(response.data.token, response.data.userId);
        setUser(response.data);
        navigate('/');
      } else {
        setNotification({ error: true, message: 'Une erreur est survenue.' });
      }
    } catch (err) {
      console.error('Error during signing in: ', err);

      if (err.response && err.response.status === 401) {
        setNotification({ error: true, message: 'Combinaison email/mot de passe incorrecte.' });
      } else {
        setNotification({ error: true, message: 'Une erreur est survenue.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async () => {
    try {
      if (!email || !password) {
        setIsLoading(false); // Stop loading animation
        setNotification({
          error: true,
          message: 'Veuillez remplir tous les champs du formulaire.',
        });
        return;
      }

      setIsLoading(true); // Start loading animation

      const response = await axios({
        method: 'POST',
        url: '/api/auth/signup',
        data: {
          email,
          password,
        },
      });

      if (!response?.data) {
        setNotification({
          error: true,
          message: 'Une erreur est survenue lors de la création de votre compte.',
        });
      } else {
        setNotification({
          error: false,
          message: 'Votre compte a bien été créé, vous pouvez vous connecter.',
        });
      }
    } catch (err) {
      setNotification({
        error: true,
        message: err.response?.data?.message || 'Erreur serveur.',
      });
      console.error('Error during signing up: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  const errorClass = notification.error ? styles.Error : null;
  return (
    <div className={`${styles.SignIn} container`}>
      <Logo />
      <div className={`${styles.Notification} ${errorClass}`}>
        {notification.message.length > 0 && <p>{notification.message}</p>}
      </div>
      <div className={styles.Form}>
        <label htmlFor={email}>
          <p>Adresse email</p>
          <input
            className=""
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); }}
          />
        </label>
        <label htmlFor="password">
          <p>Mot de passe</p>
          <input
            className="border-2 outline-none p-2 rounded-md"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); }}
          />
        </label>
        <div className={styles.Submit}>
          <button
            type="submit"
            className="
            flex justify-center
            p-2 rounded-md w-1/2 self-center
            bg-gray-800  text-white hover:bg-gray-800"
            onClick={signIn}
          >
            {isLoading ? <div className="" /> : null}
            <span>
              Se connecter
            </span>
          </button>
          <span>OU</span>
          <button
            type="submit"
            className="
            flex justify-center
            p-2 rounded-md w-1/2 self-center
            bg-gray-800  text-white hover:bg-gray-800"
            onClick={signUp}
          >
            {
                isLoading
                  ? <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" /> : null
              }
            <span>
              {'S\'inscrire'}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}

SignIn.propTypes = {
  setUser: PropTypes.func.isRequired,
};
export default SignIn;
