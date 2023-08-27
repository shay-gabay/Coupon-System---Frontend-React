import { useState } from "react";
import "./SingleCompany.css";
import axios from "axios";
import { CompanyModel } from "../../../Models/CompanyModel";
import CompanyCard from "../../Shared/Card/CompanyCard";
import urlService from "../../../Services/UrlService";
import notifyService from "../../../Services/NotificationService";

function SingleCompany(): JSX.Element {
  const [company, setCompany] = useState<CompanyModel | undefined>();
  const [companyId, setCompanyId] = useState<number>(0);
  const [isValidInput, setIsValidInput] = useState(true);
  const n = 10;

  const handleSubmit = () => {
    if (companyId <= n && companyId >= 1) {
      axios
        .get<CompanyModel>(`${urlService.admin}/company/${companyId}`)
        .then((res) => {
          console.log(res.data);
          setCompany(res.data);
          setIsValidInput(true);
        })
        .catch((err) => {
          notifyService.showErrorNotification(err)
        });
    } else {
      setIsValidInput(false);
    }
  };

  return (
    <div>
      <h1 className="h1">Single Company</h1>
      <div className="input company-card">
        <h2>Please insert the ID of the company you want</h2>
        <input
          className={`input-window ${!isValidInput ? "input-error" : ""}`}
          type="number"
          min="1"
          placeholder="ID..."
          value={companyId}
          onChange={(e) => {
            setCompanyId(Number(e.target.value));
            setIsValidInput(true);
          }}
        />
        <button className="submit" onClick={handleSubmit}>
          Apply
        </button>
      </div>
      {company && <CompanyCard company={company} />}
    </div>
  );
}

export default SingleCompany;