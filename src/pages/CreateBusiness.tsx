import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { SubmitEvent, useState } from 'react';
import { Business } from '../types';
import { createBusinessRequest } from '../services/CreateBusiness';
import { useNavigate } from 'react-router-dom';

export default function CreateBusiness() {
  const [phone, setPhone] = useState<string | undefined>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const business: Business = {
      id: null,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: phone,
      description: formData.get('description'),
      address: formData.get('address'),
      city: formData.get('city'),
      country: formData.get('country'),
      isActive: formData.get('isActive') === 'Active',
    };

    const response = await createBusinessRequest(business);
    if (response.status === 201) {
      navigate('/business');
    } else {
      alert(response.message);
    }
  };

  return (
    <section className="bg-gray-700 rounded-md w-130 h-130 m-auto flex flex-col p-2">
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
        <h2 className="text-2xl font-semibold ml-auto mr-auto border-b border-gray-200 w-60 text-center pb-1">
          Create a Business
        </h2>
        <div className="flex justify-between pl-3 pr-3">
          <div className="flex flex-col mt-5">
            <label htmlFor="name">
              Business Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              className="bg-gray-100 w-50 rounded-sm pl-2 text-gray-900"
              required
            ></input>
          </div>
          <div className="flex flex-col mt-5">
            <label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              className="bg-gray-100 w-50 rounded-sm pl-2 text-gray-900"
              required
            ></input>
          </div>
        </div>
        <div className="flex justify-between pl-3 pr-3">
          <div className="flex flex-col mt-5">
            <label htmlFor="phone">Phone Number</label>
            <div className="flex flex-col bg-gray-100 rounded-sm h-6 mb-0 w-50 pl-2 text-gray-900">
              <PhoneInput
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e?.toString())}
                defaultCountry={'GR'}
              />
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <label htmlFor="is-active">
              Availability <span className="text-red-500">*</span>
            </label>
            <select
              name="is-active"
              className="bg-gray-100 w-50 h-6 rounded-sm pl-2 text-gray-900 hover:cursor-pointer"
              required
            >
              <option className="text-gray-900">Active</option>
              <option className="text-gray-900">Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col mt-5 pl-3 pr-3">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            className="bg-gray-100 w-full rounded-sm pl-2 text-gray-900 h-25 resize-none align-top"
            maxLength={255}
          ></textarea>
        </div>
        <div className="flex">
          <div className="flex flex-col mt-5 pl-3 pr-3 w-fit gap-y-0.5">
            <label htmlFor="address">Address</label>
            <input
              name="address"
              type="text"
              className="bg-gray-100 w-50 rounded-sm pl-2 text-gray-900"
            ></input>
            <label htmlFor="city">City</label>
            <input
              name="city"
              type="text"
              className="bg-gray-100 w-50 rounded-sm pl-2 text-gray-900"
            ></input>
            <label htmlFor="address">Country</label>
            <input
              name="country"
              type="text"
              className="bg-gray-100 w-50 rounded-sm pl-2 text-gray-900"
            ></input>
          </div>

          <button className="w-1/3 h-1/2 bg-gray-600 ml-auto mr-12 mt-16 hover:bg-gray-500">
            Create Business
          </button>
        </div>
      </form>
    </section>
  );
}
