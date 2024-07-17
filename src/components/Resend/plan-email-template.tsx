import React from 'react';

interface Props {
  name: string;
  email: string;
  accommodation: {
    Name: string;
    Type: string;
    CheckInDate: string;
    CheckOutDate: string;
    CostPerNight: number;
    TotalCost: number;
    Address: string;
    ContactInfo: string;
    AdditionalInfo: string;
  };
  transportation: {
    Mode: string;
    Details: {
      Mode: string;
      Booking: string;
      Cost: number;
      Duration: string;
      DepartureTime: string;
      ArrivalTime: string;
      DepartureLocation: string;
      ArrivalLocation: string;
      AdditionalInfo: string;
    };
  }[];
  budget: {
    Currency: string;
    TotalCost: number;
    FlightCost: number;
    AccommodationCost: number;
    FoodCost: number;
    ActivitiesCost: number;
  };
  activities: {
    Name: string;
    Date: string;
    Time: string;
    Location: string;
    Cost: number;
    Booking: string;
    AdditionalInfo: string;
  }[];
  packingList: string[];
}

const PlanEmailTemplate: React.FC<Props> = ({ name, email, accommodation, transportation, budget, activities, packingList }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>Hello {name},</h1>
        <p>This email is from Explora:</p>
        
        <h2 style={{ color: '#007bff', marginTop: '30px' }}>Your Trip Details</h2>

        {/* Accommodation */}
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: '#17a2b8' }}>Accommodation</h3>
          <p>Check In Date: {accommodation.CheckInDate}</p>
          <p>Check Out Date: {accommodation.CheckOutDate}</p>
          <p>Info: {accommodation.AdditionalInfo}</p>
          <p>Name of place: {accommodation.Name}</p>
          <p>Address: {accommodation.Address}</p>
          <p>Type: {accommodation.Type}</p>
          <p>Contact info: {accommodation.ContactInfo}</p>
          <p>Cost Per Night: {accommodation.CostPerNight}</p>
          <p>Total Stay Cost: {accommodation.TotalCost}</p>
        </div>

        {/* Transportation */}
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: '#17a2b8' }}>Transportation</h3>
          {transportation.map((trans, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <h4>{trans.Mode}</h4>
              <p>Info: {trans.Details.AdditionalInfo}</p>
              <p>Departure Location: {trans.Details.DepartureLocation}</p>
              <p>Departure Time: {trans.Details.DepartureTime}</p>
              <p>Duration: {trans.Details.Duration}</p>
              <p>Booking: {trans.Details.Booking}</p>
              <p>Arrival Location: {trans.Details.ArrivalLocation}</p>
              <p>Arrival Time: {trans.Details.ArrivalTime}</p>
              <p>Cost: {trans.Details.Cost} {budget.Currency}</p>
            </div>
          ))}
        </div>

        {/* Budget */}
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: '#17a2b8' }}>Budget</h3>
          <p>Currency: {budget.Currency}</p>
          <p>Total trip Cost: {budget.TotalCost}</p>
          <p>Flight Cost: {budget.FlightCost}</p>
          <p>Accommodation Cost: {budget.AccommodationCost}</p>
          <p>Food Cost: {budget.FoodCost}</p>
          <p>Activities Cost: {budget.ActivitiesCost}</p>
        </div>

        {/* Activities */}
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: '#17a2b8' }}>Activities</h3>
          {activities.map((activity, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
                <h4 style={{ color: '#17a2b2' }}>Name: {activity.Name}</h4>
              <p>Date: {activity.Date}</p>
              
              <p>Location: {activity.Location}</p>
              <p>Time: {activity.Time}</p>
              <p>Info: {activity.AdditionalInfo}</p>
              <p>Booking: {activity.Booking}</p>
              <p>Cost: {activity.Cost}</p>
            </div>
          ))}
        </div>

        {/* Packing List */}
        <div style={{ marginTop: '20px' }} >
          <h3 style={{ color: '#17a2b8' }}>Packing List</h3>
          <ul>
            {packingList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <p style={{ marginTop: '30px' }}>Best regards,</p>
        <p>The Explora Team</p>
      </div>
    </div>
  );
};

export default PlanEmailTemplate;
