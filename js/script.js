document.addEventListener("DOMContentLoaded", function () {
    const deliveryForm = document.getElementById("deliveryForm");
    const result = document.getElementById("result");
    const resetBtn = document.getElementById("resetBtn");

    if (deliveryForm) {
        deliveryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Get customer information
            const customerName = document.getElementById("customerName").value.trim();
            const customerEmail = document.getElementById("customerEmail").value.trim();
            const weightInput = document.getElementById("weight").value.trim();
            const weight = parseFloat(weightInput);

            // Get selected destination and delivery speed
            const destination = document.querySelector('input[name="destination"]:checked');
            const speed = document.querySelector('input[name="speed"]:checked');

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Form Validation with Alerts
            if (customerName === "") {
                alert("Please enter your full name.");
                document.getElementById("customerName").focus();
                return;
            }

            if (customerEmail === "" || !emailPattern.test(customerEmail)) {
                alert("Please enter a valid email address.");
                document.getElementById("customerEmail").focus();
                return;
            }

            if (!destination) {
                alert("Please select a delivery destination zone.");
                return;
            }

            if (weightInput === "" || isNaN(weight) || weight <= 0 || weight > 30) {
                alert("Please enter a valid parcel weight between 0.1 kg and 30 kg.");
                document.getElementById("weight").focus();
                return;
            }

            if (!speed) {
                alert("Please select a delivery option.");
                return;
            }

            // Calculate destination charge
            const destinationCharge = Number(destination.value);

            // Calculate weight charge
            let weightCharge = 0;
            if (weight <= 1) {
                weightCharge = 5;
            } else if (weight <= 5) {
                weightCharge = 10;
            } else if (weight <= 10) {
                weightCharge = 20;
            } else {
                weightCharge = 30;
            }

            // Calculate delivery speed charge
            let speedCharge = 0;
            let speedName = "";

            if (speed.value === "standard") {
                speedCharge = 0;
                speedName = "Standard delivery";
            } else {
                speedCharge = 15;
                speedName = "Express delivery";
            }

            // Calculate total delivery cost
            const total = destinationCharge + weightCharge + speedCharge;

            alert("Calculation complete!");

            // Display result WITH PRINT & NEW ESTIMATE BUTTONS
            result.innerHTML = `
                <div class="result-card">
                    <p class="result-tag">✦ MISSION CONFIRMED</p>
                    <h3>Your delivery is ready, ${customerName}!</h3>
                    <p>We've prepared your delivery estimate.</p>

                    <div class="result-line">
                        <span>Destination charge</span>
                        <strong>RM ${destinationCharge.toFixed(2)}</strong>
                    </div>

                    <div class="result-line">
                        <span>Weight charge</span>
                        <strong>RM ${weightCharge.toFixed(2)}</strong>
                    </div>

                    <div class="result-line">
                        <span>${speedName}</span>
                        <strong>RM ${speedCharge.toFixed(2)}</strong>
                    </div>

                    <div class="result-total">
                        <span>Estimated total</span>
                        <strong>RM ${total.toFixed(2)}</strong>
                    </div>

                    <p class="result-email">
                        Estimate prepared for ${customerEmail}
                    </p>

                    <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 18px;">
                        <button type="button" onclick="window.print()" class="mission-button" style="justify-content: center; background: rgba(40,20,60,0.9);">
                            Print Summary
                        </button>
                        <button type="button" id="startNewBtn" class="mission-button" style="justify-content: center; background: linear-gradient(110deg, #a855f7, #c084fc);">
                            New Estimate
                        </button>
                    </div>
                </div>
            `;

            result.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

            // Handle Start New Estimate button click
            const startNewBtn = document.getElementById("startNewBtn");
            if (startNewBtn) {
                startNewBtn.addEventListener("click", function () {
                    deliveryForm.reset();
                    result.innerHTML = "";
                    window.scrollTo({ top: 0, behavior: "smooth" });
                });
            }
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            deliveryForm.reset();
            result.innerHTML = "";
        });
    }
});