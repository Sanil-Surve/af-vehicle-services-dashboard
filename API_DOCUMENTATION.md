# Bookings API Documentation

## Overview

A comprehensive REST API for managing vehicle service bookings with full CRUD operations, authentication, and authorization.

## Base URL

```
http://localhost:3000/api/bookings
```

## Authentication

All endpoints require Supabase authentication. Include the session cookie in requests.

---

## Endpoints

### 1. List Bookings

**GET** `/api/bookings`

Fetch all bookings for the authenticated user.

#### Query Parameters (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by booking status: `pending`, `confirmed`, `completed`, `cancelled` |
| `start_date` | string | Filter bookings starting from this date (ISO 8601) |
| `end_date` | string | Filter bookings ending before this date (ISO 8601) |

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "vehicle_id": "uuid",
      "start_date": "2026-02-15T00:00:00Z",
      "end_date": "2026-02-20T00:00:00Z",
      "total_price": 5000,
      "status": "confirmed",
      "created_at": "2026-02-10T04:00:00Z",
      "vehicle": {
        "id": "uuid",
        "name": "Toyota Camry",
        "type": "sedan",
        "price_per_day": 1000
      }
    }
  ]
}
```

---

### 2. Get Single Booking

**GET** `/api/bookings/:id`

Fetch details of a specific booking.

#### Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "user_id": "uuid",
    "vehicle_id": "uuid",
    "start_date": "2026-02-15T00:00:00Z",
    "end_date": "2026-02-20T00:00:00Z",
    "total_price": 5000,
    "status": "confirmed",
    "created_at": "2026-02-10T04:00:00Z",
    "vehicle": { /* vehicle details */ }
  }
}
```

---

### 3. Create Booking

**POST** `/api/bookings`

Create a new booking.

#### Request Body

```json
{
  "vehicle_id": "uuid",
  "start_date": "2026-02-15T00:00:00Z",
  "end_date": "2026-02-20T00:00:00Z",
  "total_price": 5000
}
```

#### Response (201 Created)

```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": "uuid",
    "user_id": "uuid",
    "vehicle_id": "uuid",
    "start_date": "2026-02-15T00:00:00Z",
    "end_date": "2026-02-20T00:00:00Z",
    "total_price": 5000,
    "status": "pending",
    "created_at": "2026-02-10T04:00:00Z"
  }
}
```

---

### 4. Update Booking

**PATCH** `/api/bookings/:id`

Update an existing booking. Users can only update their own bookings.

#### Request Body (All fields optional)

```json
{
  "start_date": "2026-02-16T00:00:00Z",
  "end_date": "2026-02-21T00:00:00Z",
  "total_price": 5500,
  "status": "confirmed"
}
```

#### Response

```json
{
  "success": true,
  "message": "Booking updated successfully",
  "data": { /* updated booking */ }
}
```

---

### 5. Cancel Booking

**DELETE** `/api/bookings/:id`

Cancel a booking (sets status to 'cancelled'). Users can only cancel their own bookings.

#### Response

```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": {
    "id": "uuid",
    "status": "cancelled",
    /* other booking details */
  }
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "error": "Missing required fields: vehicle_id, start_date, end_date, total_price"
}
```

### 403 Forbidden

```json
{
  "success": false,
  "error": "Unauthorized or booking not found"
}
```

### 404 Not Found

```json
{
  "success": false,
  "error": "Booking not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "error": "Failed to [action] booking"
}
```

---

## Usage Examples

### Using Fetch API

```javascript
// Create a booking
const createBooking = async () => {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      vehicle_id: 'abc-123',
      start_date: new Date('2026-02-15'),
      end_date: new Date('2026-02-20'),
      total_price: 5000
    })
  });
  const data = await response.json();
  console.log(data);
};

// Fetch user's bookings
const getBookings = async () => {
  const response = await fetch('/api/bookings?status=confirmed');
  const data = await response.json();
  console.log(data.data);
};

// Update booking
const updateBooking = async (id) => {
  const response = await fetch(`/api/bookings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'confirmed'
    })
  });
  const data = await response.json();
  console.log(data);
};

// Cancel booking
const cancelBooking = async (id) => {
  const response = await fetch(`/api/bookings/${id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  console.log(data);
};
```

---

## TypeScript Types

```typescript
type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

interface Booking {
  id: string;
  user_id: string;
  vehicle_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: BookingStatus;
  created_at: string;
  vehicle?: Vehicle;
}

interface CreateBookingDTO {
  vehicle_id: string;
  start_date: Date;
  end_date: Date;
  total_price: number;
}

interface UpdateBookingDTO {
  start_date?: Date;
  end_date?: Date;
  total_price?: number;
  status?: BookingStatus;
}
```
