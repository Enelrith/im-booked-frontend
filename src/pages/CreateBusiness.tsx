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
      services: null,
    };

    const response = await createBusinessRequest(business);
    if (response.status === 201) {
      navigate('/business');
    } else {
      alert(response.message);
    }
  };

  return (
    <section className="ml-auto mr-auto mt-10 flex flex-col w-250 gap-y-6 pb-10">
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-gray-100">
            Create a Business
          </h2>
        </div>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="px-6 py-6 flex flex-col gap-y-6"
        >
          <div className="grid grid-cols-2 gap-x-6">
            <div className="flex flex-col gap-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Business name"
                className="bg-gray-700 text-gray-100 rounded-md px-3 py-2 text-sm outline-none border border-gray-600 focus:border-blue-500 placeholder-gray-500 transition-colors"
                required
              />
            </div>
            <div className="flex flex-col gap-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                Business Email <span className="text-red-400">*</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Business email"
                className="bg-gray-700 text-gray-100 rounded-md px-3 py-2 text-sm outline-none border border-gray-600 focus:border-blue-500 placeholder-gray-500 transition-colors"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6">
            <div className="flex flex-col gap-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                Phone Number
              </label>
              <div className="bg-gray-700 text-gray-100 rounded-md px-3 py-2 text-sm border border-gray-600 focus-within:border-blue-500 transition-colors">
                <PhoneInput
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e?.toString())}
                  defaultCountry="GR"
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                Availability <span className="text-red-400">*</span>
              </label>
              <select
                name="isActive"
                className="bg-gray-700 text-gray-100 rounded-md px-3 py-2 text-sm outline-none border border-gray-600 focus:border-blue-500 cursor-pointer transition-colors"
                required
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-y-1.5">
            <label className="text-xs uppercase tracking-wider text-gray-400 font-medium">
              Description
            </label>
            <textarea
              name="description"
              placeholder="What does your business do?"
              className="bg-gray-700 text-gray-100 rounded-md px-3 py-2 text-sm outline-none border border-gray-600 focus:border-blue-500 placeholder-gray-500 resize-none h-24 transition-colors"
              maxLength={255}
            />
          </div>

          <div className="grid grid-cols-3 gap-x-6">
            <div className="flex flex-col gap-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                Address
              </label>
              <input
                name="address"
                type="text"
                placeholder="Street 123"
                className="bg-gray-700 text-gray-100 rounded-md px-3 py-2 text-sm outline-none border border-gray-600 focus:border-blue-500 placeholder-gray-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                City
              </label>
              <input
                name="city"
                type="text"
                placeholder="Athens"
                className="bg-gray-700 text-gray-100 rounded-md px-3 py-2 text-sm outline-none border border-gray-600 focus:border-blue-500 placeholder-gray-500 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                Country
              </label>
              <input
                name="country"
                type="text"
                placeholder="Greece"
                className="bg-gray-700 text-gray-100 rounded-md px-3 py-2 text-sm outline-none border border-gray-600 focus:border-blue-500 placeholder-gray-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-end gap-x-3 pt-2 border-t border-gray-700">
            <button
              type="button"
              onClick={() => navigate('/business')}
              className="px-4 py-2 text-sm text-gray-400 hover:text-gray-100 hover:bg-gray-700 rounded-md transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-150"
            >
              Create Business
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
