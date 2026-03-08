import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getBusinessReport,
  getPreviousMonthsBusinessReports,
} from '../services/BusinessReport';
import { ErrorResponse, IBusinessReport } from '../types';

export default function ViewReport() {
  const [report, setReport] = useState<IBusinessReport>();
  const [error, setError] = useState<ErrorResponse>();
  const [showPreviousMonths, setShowPreviousMonths] = useState<boolean>(false);
  const [previousMonthReports, setPreviousMonthReports] = useState<
    IBusinessReport[]
  >([]);
  const params = useParams();
  const businessId = params.id || '';

  useEffect(() => {
    const loadReport = async () => {
      const response = await getBusinessReport(businessId);

      if (response.status === 200) {
        setReport(response.data);
      } else {
        setError(response);
      }
    };

    loadReport();
  }, [businessId]);

  const handleShowPreviousMonthsClick = async () => {
    setShowPreviousMonths(true);
    const response = await getPreviousMonthsBusinessReports(businessId);

    if (response.status === 200) {
      setPreviousMonthReports(response.data);
    } else {
      setError(response);
    }
  };

  const renderPreviousMonthsReports = () =>
    previousMonthReports.map((report) => <MonthlyReportCard report={report} />);

  if (!report && error) {
    return (
      <section className="ml-auto mr-auto mt-10 flex flex-col w-250 gap-y-6 pb-10">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
          <p className="text-red-400 text-sm">
            {error?.message ??
              'An error has occurred while loading your report'}
          </p>
        </div>
      </section>
    );
  }

  if (!report) {
    return (
      <section className="ml-auto mr-auto mt-10 flex flex-col w-250 gap-y-6 pb-10">
        <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg px-4 py-3">
          <p className="text-gray-400 text-sm">Loading Report...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="ml-auto mr-auto mt-10 flex flex-col w-250 gap-y-6 pb-10">
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700 flex justify-between">
          <h2 className="text-lg font-semibold text-gray-100">Overall</h2>
          <Link to={`/business/${businessId}`}>
            <span className="text-gray-100 hover:text-gray-300 active:text-gray-100 transition">
              Back to Business &rarr;
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-5 divide-x divide-gray-700">
          <StatCard
            label="Total Appointments"
            value={report.totalAppointments}
          />
          <StatCard
            label="Completed"
            value={report.completedAppointments}
            valueClass="text-green-400"
          />
          <StatCard
            label="Cancelled"
            value={report.cancelledAppointments}
            valueClass="text-red-400"
          />
          <StatCard
            label="Scheduled"
            value={report.scheduledAppointments}
            valueClass="text-blue-400"
          />
          <StatCard
            label="Total Revenue"
            value={`€${report.totalRevenue}`}
            valueClass="text-gray-100"
          />
        </div>
      </div>
      <MonthlyReportCard report={report} />
      {!showPreviousMonths ? (
        <button
          className="bg-gray-800 outline outline-gray-700 w-fit ml-auto mr-auto hover:bg-gray-800/70 active:bg-gray-800 transition"
          onClick={() => handleShowPreviousMonthsClick()}
        >
          <span className="text-sm">Show Previous Months &darr;</span>
        </button>
      ) : (
        <button
          className="bg-gray-800 outline outline-gray-700 w-fit ml-auto mr-auto hover:bg-gray-800/70 active:bg-gray-800 transition"
          onClick={() => setShowPreviousMonths(false)}
        >
          <span className="text-sm">Hide Previous Months &uarr;</span>
        </button>
      )}
      {showPreviousMonths && renderPreviousMonthsReports()}
    </section>
  );
}

function StatCard({
  label,
  value,
  valueClass = 'text-gray-100',
}: {
  label: string;
  value: string | number;
  valueClass?: string;
}) {
  return (
    <div className="px-6 py-5 flex flex-col gap-y-1">
      <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
        {label}
      </span>
      <span className={`text-2xl font-semibold ${valueClass}`}>{value}</span>
    </div>
  );
}

function MonthlyReportCard({ report }: { report: IBusinessReport }) {
  const formattedMonth =
    report.monthName.charAt(0).toUpperCase() +
    report.monthName.substring(1).toLowerCase();

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-gray-100">
          {formattedMonth}
        </h2>
      </div>
      <div className="grid grid-cols-4 divide-x divide-gray-700">
        <StatCard
          label="Total Appointments"
          value={report.monthlyAppointments}
        />
        <StatCard
          label="Completed"
          value={report.monthlyCompletedAppointments}
          valueClass="text-green-400"
        />
        <StatCard
          label="Cancelled"
          value={report.monthlyCancelledAppointments}
          valueClass="text-red-400"
        />
        <StatCard
          label="Revenue"
          value={`€${report.monthlyRevenue}`}
          valueClass="text-gray-100"
        />
      </div>
    </div>
  );
}
