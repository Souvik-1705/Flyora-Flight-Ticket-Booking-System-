import Flight from "../models/Flight.js";


export const createFlight = async (req, res) => {
    try {
        const flight = await Flight.create(req.body);
        res.status(201).json({ message: "Flight created", flight });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const getFlights = async (req, res) => {
    try {
        const flights = await Flight.find();
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const searchFlights = async (req, res) => {

    try {

        const { from, to, date } = req.query;

        const query = {};

        if (from) {

            query.from = {
                $regex: from,
                $options: "i",
            };

        }

        if (to) {

            query.to = {
                $regex: to,
                $options: "i",
            };

        }

        if (date) {
            query.date = date;
        }

        const flights = await Flight.find(query);

        res.status(200).json(flights);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }

};


export const getFlightById = async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }
        res.status(200).json(flight);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const updateFlight =
    async (req, res) => {

        try {

            const flight =
                await Flight.findById(
                    req.params.id
                );

            // check flight

            if (!flight) {

                return res.status(404).json({

                    message:
                        "Flight not found",

                });

            }

            // update

            const updatedFlight =
                await Flight.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true,
                    }

                );

            res.status(200).json({

                message:
                    "Flight Updated Successfully",

                updatedFlight,

            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    "Server Error",

            });

        }

    };
export const deleteFlight =
    async (req, res) => {

        try {

            const flight =
                await Flight.findById(
                    req.params.id
                );

            if (!flight) {

                return res.status(404).json({

                    message:
                        "Flight not found",

                });

            }

            await Flight.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({

                message:
                    "Flight deleted successfully",

            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    "Server Error",

            });

        }

    };