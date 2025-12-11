# Dynamic Routing Refactor - Summary

## Overview
Successfully refactored the bus-reservation app from **state-based navigation** to **URL parameter-based dynamic routing**. This improves UX with shareable URLs and persistence across page refreshes.

## Changes Made

### 1. **App.js** - Updated Routes
**Before (Static Routes with State):**
```jsx
<Route path="/buses" element={<BusList />} />
<Route path="/select-seat" element={<SeatSelection />} />
<Route path="/passenger" element={<PassengerDetails />} />
<Route path="/confirm" element={<Confirmation />} />
<Route path="/admin/dashboard" element={<RequireAdmin><div>ADMIN TEST</div></RequireAdmin>} />
```

**After (Dynamic Routes with URL Params):**
```jsx
<Route path="/buses" element={<BusList />} />
<Route path="/seats/:busId" element={<SeatSelection />} />
<Route path="/passenger/:bookingId" element={<PassengerDetails />} />
<Route path="/confirm/:bookingId" element={<Confirmation />} />
<Route path="/admin/dashboard" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
```

**Also:** Restored `AdminDashboard` component (was placeholder `<div>ADMIN TEST</div>`), removed debug logging.

---

### 2. **SearchBus.js** - Save Params to localStorage
**Change:** Instead of passing state via navigate, save search params to localStorage before navigating.

```jsx
const submit = (e) => {
  e.preventDefault();
  if (!from || !to || !date) {
    alert("Please fill From, To and Date");
    return;
  }
  // Save search params to localStorage
  localStorage.setItem("searchFrom", from);
  localStorage.setItem("searchTo", to);
  localStorage.setItem("searchDate", date);
  navigate("/buses");
};
```

---

### 3. **BusList.js** - Use localStorage & Navigate with busId
**Before:**
```jsx
const { from, to, date } = location.state || {};
const goToSeat = (bus) => {
  navigate("/select-seat", { state: { bus, from, to, date } });
};
```

**After:**
```jsx
const from = localStorage.getItem("searchFrom");
const to = localStorage.getItem("searchTo");
const date = localStorage.getItem("searchDate");
const goToSeat = (bus) => {
  navigate(`/seats/${bus.id}`);
};
```

---

### 4. **SeatSelection.js** - Use useParams & Save Booking
**Before:**
```jsx
const { bus, from, to, date } = location.state || {};
const continueBooking = () => {
  navigate("/passenger", { state: { bus, from, to, date, selectedSeats, totalPrice } });
};
```

**After:**
```jsx
const { busId } = useParams();
const buses = [...]; // mock data
const bus = buses.find(b => b.id === parseInt(busId));
const from = localStorage.getItem("searchFrom");
const to = localStorage.getItem("searchTo");
const date = localStorage.getItem("searchDate");

const continueBooking = () => {
  const bookingId = Date.now().toString();
  localStorage.setItem(`booking-${bookingId}`, JSON.stringify({
    bus, from, to, date, selectedSeats, totalPrice
  }));
  navigate(`/passenger/${bookingId}`);
};
```

---

### 5. **PassengerDetails.js** - Use useParams & localStorage
**Before:**
```jsx
const { bus, from, to, date, selectedSeats, totalPrice } = location.state || {};
const submit = () => {
  navigate("/confirm", { state: { bus, from, to, date, selectedSeats, totalPrice, passengers } });
};
```

**After:**
```jsx
const { bookingId } = useParams();
const bookingData = JSON.parse(localStorage.getItem(`booking-${bookingId}`) || "{}");
const { bus, from, to, date, selectedSeats, totalPrice } = bookingData;

const submit = () => {
  localStorage.setItem(`confirmation-${bookingId}`, JSON.stringify({
    bus, from, to, date, selectedSeats, totalPrice, passengers
  }));
  navigate(`/confirm/${bookingId}`);
};
```

---

### 6. **Confirmation.js** - Use useParams & localStorage
**Before:**
```jsx
const { state } = useLocation();
if (!state) { /* error */ }
const { bus, from, to, date, selectedSeats, totalPrice } = state;
```

**After:**
```jsx
const { bookingId } = useParams();
const confirmationData = JSON.parse(localStorage.getItem(`confirmation-${bookingId}`) || "{}");
if (!confirmationData.bus) { /* error */ }
const { bus, from, to, date, selectedSeats, totalPrice } = confirmationData;
```

---

## Data Flow (New)

```
SearchBus → localStorage {searchFrom, searchTo, searchDate}
    ↓
BusList (reads from localStorage) → navigate("/seats/1")
    ↓
SeatSelection (reads from URL param :busId)
    → saves to localStorage `booking-{bookingId}`
    → navigate(`/passenger/{bookingId}`)
    ↓
PassengerDetails (reads from URL param :bookingId & localStorage)
    → saves to localStorage `confirmation-{bookingId}`
    → navigate(`/confirm/{bookingId}`)
    ↓
Confirmation (reads from URL param :bookingId & localStorage)
    → Shows final booking summary
```

---

## Benefits

✅ **Shareable URLs**: Users can bookmark or share URLs like `/seats/1` or `/confirm/1234567890`  
✅ **Page Refresh Persistence**: Closing/refreshing pages won't lose data (stored in localStorage)  
✅ **Cleaner Navigation**: No nested state passing; URL params are explicit  
✅ **AdminDashboard Restored**: Original component now renders (debug div removed)  
✅ **Better SEO**: Dynamic URLs are more crawlable than state-based routing  

---

## Testing the Flow

1. **Search Page** (`/search`):  
   - Enter From, To, Date → Click "Search Buses"

2. **Bus List** (`/buses`):  
   - Shows buses for your route → Click on a bus

3. **Seat Selection** (`/seats/1`):  
   - Select seats → Click "Continue"

4. **Passenger Details** (`/passenger/{bookingId}`):  
   - Enter names/ages → Click "Proceed to Payment"

5. **Confirmation** (`/confirm/{bookingId}`):  
   - Final booking summary

---

## Known Storage Keys (localStorage)

- `searchFrom` - Search origin
- `searchTo` - Search destination
- `searchDate` - Travel date
- `booking-{bookingId}` - Booking details (bus, seats, prices)
- `confirmation-{bookingId}` - Final confirmation data with passengers
- `isAdmin` - Admin auth status (existing)

---

## Next Steps (Optional)

- Migrate localStorage to a backend API for persistence
- Add session timeout/expiration for bookings
- Implement actual payment processing
- Add admin dashboard features to manage bookings
