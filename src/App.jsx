import { useEffect, useState } from "react";

function App() {
  const [estimate, setEstimate] = useState(0);
  const [repayment, setRepayment] = useState({
    amount: "",
    duration: "",
    deductions: [],
  });

  useEffect(() => {
    let newEstimate = Number(repayment.amount) * Number(repayment.duration);
    repayment.deductions?.forEach(
      (deduction) =>
        (newEstimate -= Number(deduction.amount) * Number(repayment.duration))
    );

    setEstimate(newEstimate);
  }, [repayment]);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setRepayment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDeduction = () => {
    setRepayment((prev) => ({
      ...prev,
      deductions: [
        ...prev.deductions,
        { name: `#${prev.deductions.length + 1}`, amount: 0 },
      ],
    }));
  };

  const handleDeductionChange = (e) => {
    const { name, value } = e.target;

    const target = repayment.deductions.findIndex(
      (deduction) => deduction.name === name
    );

    setRepayment((prev) => {
      const deductions = [...prev.deductions];
      deductions[target].amount = value;
      return {
        ...prev,
        deductions: deductions,
      };
    });
  };

  return (
    <>
      <div className="h-screen bg-gradient-to-bl from-slate-800 to-slate-200 flex flex-col justify-center items-center w-full relative overflow-hidden">
        <div className="absolute top-3 left-2/4 bg-green-700 opacity-60 h-12 w-12 rounded-full blur"></div>
        <div className="absolute bottom-2 left-3/4 bg-green-200 opacity-60 h-12 w-12 rounded-full blur"></div>
        <div className="absolute bottom-60 right-20 bg-green-300 opacity-60 h-12 w-12 rounded-full blur"></div>
        <div className="absolute top-3 left-2/4 bg-green-100 opacity-60 h-12 w-12 rounded-full blur"></div>
        <div className="absolute bottom-96 right-7 bg-green-600 opacity-30 h-12 w-12 rounded-full blur"></div>
        <div className="absolute top-2/3 right-3/4 bg-green-600 opacity-60 h-12 w-12 rounded-full blur"></div>
        <div className="absolute top-3 left-2/4 bg-green-100 opacity-60 h-12 w-12 rounded-full blur"></div>
        <div className="bg-gray-300 px-6 py-4 rounded-lg shadow-lg flex flex-col space-y-8">
          <h1 className="text-3xl">
            Estimated amount: R{" "}
            <span className="underline decoration-green-800">
              {estimate.toFixed(2)}
            </span>
          </h1>

          <div className="flex ">
            <label className="px-3 py-0.5 ">Repayment</label>
            <input
              className="ring-2 ring-green-700 py-0.5 px-3 rounded w-full"
              name="amount"
              placeholder="1000"
              value={repayment.amount}
              onChange={handleChange}
            />
          </div>
          <div className="flex ">
            <label className="px-3 py-0.5 mr-4">Duration</label>
            <input
              className="ring-2 ring-green-700 py-0.5 px-3 rounded w-full"
              type="number"
              name="duration"
              value={repayment.duration}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="flex justify-between">
              <h2 className="text-2xl">Add deduction</h2>
              <button
                className="px-4 py-0.5 ring ring-green-700 bg-green-700 text-green-300"
                onClick={handleAddDeduction}
              >
                Add
              </button>
            </div>
            <div className="my-6">
              {repayment.deductions?.map((deduction, index) => (
                <div key={index}>
                  <label className="px-3 py-0.5 ">
                    Deduction {deduction.name}
                  </label>
                  <input
                    type="number"
                    className="ring-2 ring-green-700 py-0.5 px-3 rounded"
                    name={deduction.name}
                    value={deduction.amount}
                    onChange={handleDeductionChange}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
