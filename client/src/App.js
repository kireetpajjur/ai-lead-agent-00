import { useState } from 'react';
import axios from 'axios';

export default function LeadForm() {
  const [formData, setFormData] = useState({ name: '', phone: '', zip: '', issue: '', datetime: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/leads', formData);
    await axios.post('/api/book', formData);
    alert('Lead submitted and appointment booked!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setFormData({ ...formData, name: e.target.value })} />
      <input placeholder="Phone" onChange={e => setFormData({ ...formData, phone: e.target.value })} />
      <input placeholder="ZIP" onChange={e => setFormData({ ...formData, zip: e.target.value })} />
      <input placeholder="Issue" onChange={e => setFormData({ ...formData, issue: e.target.value })} />
      <input type="datetime-local" onChange={e => setFormData({ ...formData, datetime: e.target.value })} />
      <button type="submit">Submit</button>
    </form>
  );
}

function App() {
  return (
    <div>
      <h1>AI Lead Agent</h1>
      <p>This is the React frontend.</p>
    </div>
  );
}

export default App;
