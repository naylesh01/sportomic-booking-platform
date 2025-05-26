
# Backend Development Guide

## System Requirements
- Node.js (v16 or higher)
- npm (v7 or higher)

## Local Development Setup

1. **Install JSON Server globally:**
   ```bash
   npm install -g json-server
   ```

2. **Start the JSON Server:**
   ```bash
   json-server --watch db.json --port 5000
   ```

3. **Verify Installation:**
   The server will be available at `http://localhost:5000`
   
   Test the API with curl or Postman:
   ```bash
   curl http://localhost:5000/venues
   ```

## API Endpoints

Once the server is running, you can access these endpoints:

- **GET** `http://localhost:5000/venues` - Get all venues
- **GET** `http://localhost:5000/slots` - Get all slots
- **GET** `http://localhost:5000/slots?venueId=1&date=2025-05-26&booked=false` - Get available slots for venue on date
- **POST** `http://localhost:5000/bookings` - Create a new booking
- **PATCH** `http://localhost:5000/slots/1` - Update a slot (mark as booked)

## Sample Requests

### Get venues:
```bash
curl http://localhost:5000/venues
```

### Get available slots for venue 1 on 2025-05-26:
```bash
curl "http://localhost:5000/slots?venueId=1&date=2025-05-26&booked=false"
```

### Create a booking:
```bash
curl -X POST http://localhost:5000/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "John Doe",
    "sport": "Tennis",
    "date": "2025-05-26",
    "timeSlot": "09:00 AM",
    "slotId": "1-tennis-2025-05-26-09",
    "venueId": "1",
    "createdAt": "2025-05-26T10:00:00.000Z"
  }'
```

### Mark slot as booked:
```bash
curl -X PATCH http://localhost:5000/slots/1-tennis-2025-05-26-09 \
  -H "Content-Type: application/json" \
  -d '{"booked": true}'
```

## Troubleshooting

- **CORS Issues**: JSON Server automatically handles CORS for local development
- **Port conflicts**: If port 5000 is busy, use `--port 3001` or any available port
- **Data persistence**: Changes to the database are automatically saved to `db.json`

## Development Workflow

1. Start JSON Server: `json-server --watch db.json --port 5000`
2. Start React app: `npm run dev`
3. Both should run simultaneously for full functionality

The React app will make HTTP requests to the JSON Server, and you'll see real-time updates in both the UI and the `db.json` file.
