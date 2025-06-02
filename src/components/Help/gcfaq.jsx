import React, { useState } from "react";
import FAQItem from "../NavIC/FAQRender";

const Gcfaq = () => {
  const faqData = [
    // File-attached questions FIRST
    {
      title: "What are the additional features and advantages of the device?",
      description:
        "You can go through the <a href='/Documents/Elena HHN Brochure.pdf' download='Elena HHN Brochure.pdf' class='text-[var(--primary)] underline'>product brochure</a> for additional information.",
    },
    {
      title: "How can I get to know the device in complete depth?",
      description:
        "You can go through the <a href='/Documents/Elena HHN User Manual.pdf' download='Elena HHN User Manual.pdf' class='text-[var(--primary)] underline'>user manual</a>.",
    },
    {
      title: "How can I troubleshoot issues with the HHN device?",
      description:
        "Refer to the <a href='/Documents/Elena HHN Troubleshooting.pdf' download='Elena HHN Troubleshooting.pdf' class='text-[var(--primary)] underline'>troubleshooting guide</a> to resolve common problems and error conditions.",
    },
    // Remaining questions
    {
      title: "What is the Elena NavIC Handheld Navigator?",
      description:
        "The Elena NavIC Handheld Navigator is a rugged, portable GNSS device developed using indigenous R&D. It provides accurate and reliable navigation by receiving signals from NavIC (IRNSS), GPS, GLONASS, and SBAS satellites. It supports mission-critical field activities like patrolling, movement planning, deployment tracking, and situational reporting.",
    },
    {
      title: "What GNSS constellations does the Handheld Navigator support?",
      description:
        "The HANDHELD NAVIGATOR supports NavIC, GPS, and GLONASS constellations.",
    },
    {
      title: "How do I power on the Elena Handheld Navigator?",
      description:
        "Press and hold the power button until the screen lights up and Elena’s logo appears. The device will boot up and the main application will load automatically.",
    },
    {
      title:
        "Does the Handheld Navigator device support offline maps and navigation?",
      description:
        "Yes, preloaded offline maps can be used for location and waypoint navigation without internet access.",
    },
    {
      title: "What are the different coordinate systems supported?",
      description:
        "The device supports DDMMSS, Decimal Degrees, ESM, and DSM Grid Reference Systems.",
    },

    {
      title: "Is it necessary to upload map sheets before use?",
      description:
        "Yes, map sheets should be uploaded in advance via the Elena Map Processing software.",
    },
    {
      title: "What map format is supported in the Navigator?",
      description: "The Navigator supports only TIFF format files currently.",
    },

    {
      title: "What are the different coordinate systems supported?",
      description:
        "The device supports DDMMSS, Decimal Degrees, ESM, and DSM Grid Reference Systems.",
    },
    {
      title: "What are the different coordinate systems supported?",
      description:
        "The device supports DDMMSS, Decimal Degrees, ESM, and DSM Grid Reference Systems.",
    },
    {
      title:
        "Does the Handheld Navigator device support offline maps and navigation?",
      description:
        "Yes, preloaded offline maps can be used for location and waypoint navigation without internet access.",
    },
    {
      title: "What map format is supported in the Navigator?",
      description: "The Navigator supports only TIFF format files currently.",
    },
    {
      title: "What are the different coordinate systems supported?",
      description:
        "The device supports DDMMSS, Decimal Degrees, ESM, and DSM Grid Reference Systems.",
    },
    {
      title:
        "Can I customize coordinate display formats (e.g., DDMMSS or DMS)?",
      description:
        "Yes, go to the Settings tab, then select Lat Lon Format and choose from DDMMSS or Decimal Degrees.",
    },
    {
      title: "How can I calibrate the compass for accurate navigation?",
      description:
        "In the Settings menu, select the Compass icon and then select “Calibrate Compass” and follow the on-screen instructions to rotate the device in a figure-eight pattern.",
    },
    {
      title: "How do I create a waypoint and navigate to it?",
      description:
        "Tap the '+' icon in the waypoint tab, assign a name, and save it. To navigate, select the waypoint and tap “Navigate To”. Detailed instructions are provided in the user manual.",
    },
    {
      title: "How do I track my movement using the tracking feature?",
      description:
        "In the “Tracking” tab, click “track icon” and give it a name to begin recording your path. A polyline will form based on your movement. Click “Stop” to end tracking and the path will save automatically. Detailed instructions are provided in the user manual.",
    },
    {
      title: "What should I do if the device does not get a satellite fix?",
      description:
        "Ensure the device is used in an open area with a clear view of the sky. If indoors or near tall buildings, move to an unobstructed location. Wait for 1–3 minutes for the first fix.",
    },
    {
      title: "Can I use the Navigator indoors or in covered areas?",
      description:
        "Satellite-based navigation works best outdoors. Indoor usage may result in poor or no satellite fix due to signal blockage.",
    },

    {
      title: "How accurate is the Handheld Navigator?",
      description:
        "The device has proven positional accuracy of up to one-meter CEP (Circular Error Probable).",
    },
    {
      title: "Can I upload and view multiple map sheets to the device?",
      description:
        "Yes, up to 50 maps can be stored and a maximum of 10 maps can be viewed within the application at once.",
    },
    {
      title: "What is the use of the Utilities section in the application?",
      description:
        "Utilities include useful features such as a calculator, bearing calculation, torch, and other tools to augment field navigation and planning.",
    },
    {
      title: "What information is shown in the Sky View Plot?",
      description:
        "The Sky View displays DOP values, GNSS signal strength, and satellite positions.",
    },
    {
      title: "What do the different colors of the location marker mean?",
      description1: "Blue = Fix obtained",
      description2: "Grey = No Fix",
      description3: "Red = Bad compass accuracy",
    },
    {
      title: "Can I change the default password for login?",
      description:
        "Yes, after logging in, go to the Settings tab, select Account Settings, and select “Change Password.” Select the correct user and enter the current and new password to update.",
    },
    {
      title: "How is the battery percentage shown on the device?",
      description:
        "The top right of the home screen displays the battery icon which when (a little long) pressed shows the percentage and charging status icon in real time.",
    },
    {
      title: "How long does the device charge last?",
      description:
        "The device’s charge lasts about 8 hours of continuous usage.",
    },
    {
      title:
        "How long should I charge the Handheld Navigator before the first use?",
      description:
        "Charge the device fully (approx. 3 hours) before first use. Use the supplied USB-C charger for best results.",
    },
    {
      title: "What is the recommended battery charging practice?",
      description:
        "Keep the battery between 20–90% for optimal lifespan. Avoid full discharges regularly and unplug once fully charged.",
    },
    {
      title: "What happens if I overcharge the battery?",
      description:
        "The device has built-in overcharge protection, but it’s best to unplug after a full charge to prolong battery health.",
    },
    {
      title: "What should I do if the battery drains faster than expected?",
      description:
        "Lower screen brightness and close any unnecessary navigation of tracking.",
    },
    {
      title: "Is the Handheld Navigator water-resistant or waterproof?",
      description:
        "The HANDHELD NAVIGATOR is IPX7-rated, meaning it is protected against water submersion up to a certain limit.",
    },
    {
      title: "What should I do if the device gets wet?",
      description:
        "Wipe it with a dry cloth. Ensure all port covers are closed. Do not attempt to charge or open the device while wet.",
    },
    {
      title: "Can I use the Navigator in rainy or humid environments?",
      description:
        "Yes, the Handheld Navigator is designed for field use in rugged and humid conditions, but prolonged exposure to water should be avoided.",
    },
    {
      title: "Are the port caps essential for water protection?",
      description:
        "Yes, always ensure port caps are securely closed to maintain water resistance.",
    },
    {
      title: "How can I update the Handheld Navigator application?",
      description:
        "Updates are installed via USB using Map Processing Software by authorized personnel from Elena. Contact Elena Support for application updates.",
    },
    {
      title: "How do I reboot or reset the device if it freezes?",
      description:
        "Press and hold the power button for 10 seconds to force a reboot. If the issue persists, contact Support.",
    },
    {
      title:
        "Is there a way to log out of the app without powering off the device?",
      description:
        "Yes, use the “Logout” option in the Settings tab to return to the login screen.",
    },
    {
      title: "What should I do if my Handheld Navigator is not turning on?",
      description:
        "Ensure the battery is charged. Try a long press (10 seconds) on the power button. If still unresponsive, contact Elena Support for assistance.",
    },
    {
      title: "What should I do if the device does not detect the GNSS module?",
      description:
        "A status indicator is displayed in the top-right corner of the screen, next to the battery icon. If the GNSS module is connected successfully, the indicator will appear green. If the indicator is red, it means the device has not established a connection. In this case, ensure that Bluetooth is enabled on the device and re-pair it with the GNSS module through the appropriate settings menu.",
    },
    {
      title:
        "Whom do I contact in case of persistent hardware or software issues?",
      description:
        "Email or a telephone call with the description of the issue, device serial number, and a photo (if relevant) to the Elena Support team.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // Filter the FAQs based on search term (case-insensitive)
  const filteredFaqs = faqData.filter(({ title, description }) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      title.toLowerCase().includes(lowerSearch) ||
      // Strip HTML tags from description before matching text
      description
        .toLowerCase()
        .replace(/<[^>]*>?/gm, "")
        .includes(lowerSearch)
    );
  });

  return (
    <div className="max-w-full mx-auto bg-white rounded-md divide-y divide-gray-200 gap-2 p-4">
      {/* Search Input */}
      {/* <div className="mb-4 flex justify-end ">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="xl:w-[30%] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div> */}

      {/* Render filtered FAQs */}
      {filteredFaqs.length > 0 ? (
        filteredFaqs.map((faq, index) => (
          <FAQItem
            key={index}
            data={faq}
            isActive={activeIndex === index}
            onClick={() => toggleIndex(index)}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default Gcfaq;
