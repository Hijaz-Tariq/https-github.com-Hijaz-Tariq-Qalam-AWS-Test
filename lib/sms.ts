import axios from 'axios';

export const sendVerificationSMS = async (phone: string, token: string) => {
  const domain = process.env.NEXT_PUBLIC_APP_URL; // Your app's domain

  const verificationLink = `${domain}/auth/new-verification?token=${token}`;  // The verification link

  const MYID = '43fb2b281c021c32befb33bc16cdb7fa';  // Replace with your actual MYID
  const sender = 'E-Qalam';  // Replace with the actual sender ID
  const message = `اهلاً و سهلاً بك في منصة قلم , نرجو الضغط على الرابط من اجل تفعيل حسابك: ${verificationLink}`;  // The message now contains a verification link
  const encodedMessage = encodeURIComponent(message); // URL encode the message

  // Construct the URL for the GET request
  const url = `https://sms.HTD.ps/API/SendSMS.aspx?id=${MYID}&sender=${sender}&to=${phone}&msg=${encodedMessage}&mode=0`;

  console.log('Sending verification link to:', phone); // Log phone number for debugging
  console.log('HTD URL:', url); // Log the constructed URL for debugging
  console.log('URL'+verificationLink)

  try {
    // Send the GET request to the SMS API
    const response = await axios.get(url);
    console.log('HTD Response:', response.data); // Log the HTD response

    if (response.data) {
      return { success: true, message: 'Verification link sent successfully!' };
    } else {
      return { success: false, message: 'Failed to send verification link.' };
    }
  } catch (error) {
    console.error('Error sending verification link:', error);
    return { success: false, message: 'Error sending verification link.' };
  }
};


export const sendPasswordResetSMS = async (phone: string, token: string) => {
    const domain = process.env.NEXT_PUBLIC_APP_URL; // Your app's domain
  
    // Generate the password reset link
    const resetLink = `${domain}/auth/new-password?token=${token}`;  // The reset link
  
    const MYID = '43fb2b281c021c32befb33bc16cdb7fa';  // Replace with your actual MYID
    const sender = 'E-Qalam';  // Replace with the actual sender ID
    const message = `قم بالضغط على الرابط من اجل اعادة تعيين كلمة مرور حسابك في منصة قلم: ${resetLink}`;  // The message now contains a reset link
    const encodedMessage = encodeURIComponent(message); // URL encode the message
  
    // Construct the URL for the GET request to send the SMS
    const url = `https://sms.HTD.ps/API/SendSMS.aspx?id=${MYID}&sender=${sender}&to=${phone}&msg=${encodedMessage}&mode=0`;
  
    console.log('Sending password reset link to:', phone); // Log phone number for debugging
    console.log('HTD URL:', url); // Log the constructed URL for debugging
    console.log('Reset Link:', resetLink);
  
    try {
      // Send the GET request to the SMS API
      const response = await axios.get(url);
      console.log('HTD Response:', response.data); // Log the HTD response
  
      // Check if the response indicates success
      if (response.data) {
        return { success: true, message: 'Password reset link sent successfully via SMS!' };
      } else {
        return { success: false, message: 'Failed to send password reset link via SMS.' };
      }
    } catch (error) {
      console.error('Error sending password reset link:', error);
      return { success: false, message: 'Error sending password reset link via SMS.' };
    }
  };