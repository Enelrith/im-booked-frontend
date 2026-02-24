import { SubmitEvent, useState } from 'react';
import { registerUser } from '../services/Register';
import { ErrorResponse } from '../types';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');
  const [errors, setErrors] = useState<ErrorResponse | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await registerUser(email, password, rePassword);
    if (!response) return;

    if (response.status == 201) {
      navigate('/login');
    } else {
      setErrors(response.data);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="element-theme flex flex-col w-100 h-auto text-center p-2 mt-30 gap-y-1 rounded-sm shadow-sm shadow-gray-500">
        <h2 className="text-xl border-b border-gray-200 w-35 m-auto pb-0.5 text-shadow-sm text-shadow-gray-900">
          Get Booked
        </h2>
        <div className="flex flex-col gap-y-1 p-2 pt-3">
          <label htmlFor={'email'} className="text-left">
            Email
          </label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="w-full rounded-lg bg-gray-100 text-gray-900 p-1 pl-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors?.validationErrors?.email && (
            <p className="text-red-500 text-sm text-left">
              {errors.validationErrors.email}
            </p>
          )}
          {errors?.status == 409 && (
            <p className="text-red-500 text-sm text-left">{errors.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-1 p-2 pt-2">
          <label htmlFor={'password'} className={'text-left'}>
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className={'w-full rounded-lg bg-gray-100 text-gray-900 p-1 pl-2'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          {errors?.validationErrors?.password && (
            <p className="text-red-500 text-sm text-left">
              {errors.validationErrors.password}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-1 p-2 pt-2">
          <label htmlFor={'rePassword'} className={'text-left'}>
            Repeat Password
          </label>
          <input
            type="password"
            name="rePassword"
            placeholder="Repeat your password"
            className={'w-full rounded-lg bg-gray-100 text-gray-900 p-1 pl-2'}
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
          ></input>
          {password !== rePassword && (
            <p className="text-red-500 text-sm text-left">
              Passwords do not match
            </p>
          )}
        </div>
        <button className="button-theme w-2/3 m-auto hover:bg-gray-800 transition-colors duration-100">
          Create Account
        </button>
      </div>
    </form>
  );
}
