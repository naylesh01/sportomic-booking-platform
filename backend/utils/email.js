const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendBookingConfirmation = async (booking) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: booking.userId.email,
      subject: 'Booking Confirmation - Sportomic',
      html: `
        <h1>Booking Confirmation</h1>
        <p>Dear ${booking.userId.name},</p>
        <p>Your booking has been confirmed:</p>
        <ul>
          <li>Venue: ${booking.venueId.name}</li>
          <li>Sport: ${booking.sport}</li>
          <li>Date: ${new Date(booking.date).toLocaleDateString()}</li>
          <li>Time: ${booking.timeSlot}</li>
          <li>Amount: ₹${booking.amount}</li>
        </ul>
        <p>Thank you for choosing Sportomic!</p>
      `
    });
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};
