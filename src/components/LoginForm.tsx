import { SubmitEvent, useState } from 'react';
import { ErrorResponse } from '../types';
import { loginUser } from '../services/Login';
import { setAuthHeader } from '../services/Axios';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ErrorResponse | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await loginUser(email, password);
    if (!response) return;
    if (response.status == 200) {
      setAuthHeader(response.data.accessToken);

      const tokenPayload = JSON.parse(
        atob(response.data.accessToken.split('.')[1])
      );
      localStorage.setItem('email', tokenPayload.sub);

      navigate('/');
    } else {
      setErrors(response.data);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="element-theme flex flex-col w-100 h-auto text-center p-2 mt-30 gap-y-1 rounded-sm shadow-sm shadow-gray-500">
        <h2 className="text-xl border-b border-gray-200 w-20 m-auto pb-0.5 text-shadow-sm text-shadow-gray-900">
          Login
        </h2>
        {!errors?.validationErrors && errors && (
          <p className="text-red-500 text-sm text-left pl-2">
            {errors.message}
          </p>
        )}
        {errors?.validationErrors && (
          <p className="text-red-500 text-sm text-left pl-2">
            {errors.validationErrors.email}
          </p>
        )}
        <div className="flex flex-col gap-y-1 p-2 pt-1">
          <label
            htmlFor="email"
            className="flex flex-col gap-y-1 p-2 pt-3 text-left"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full rounded-lg bg-gray-100 text-gray-900 p-1 pl-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div className="flex flex-col gap-y-1 p-2">
          <label
            htmlFor="password"
            className="flex flex-col gap-y-1 p-2 pt-3 text-left"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full rounded-lg bg-gray-100 text-gray-900 p-1 pl-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          {errors?.validationErrors && (
            <p className="text-red-500 text-sm text-left pl-2">
              {errors.validationErrors.password}
            </p>
          )}
        </div>
        <button className="button-theme w-2/3 m-auto hover:bg-gray-800 transition-colors duration-100">
          Login
        </button>
      </div>
    </form>
  );
}
