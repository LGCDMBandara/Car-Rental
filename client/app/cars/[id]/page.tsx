import CarDetails from "@/components/CarDetails/CarDetails";
import CarDetail from "@/components/CarDetails/List/CarDetail";

interface CarDetailsPageProps {
    params: {
        id: string;
    };
}

const CarDetailsPage = ({ params }: CarDetailsPageProps) => {
    const { id } = params;

    return (
        <div>
            <CarDetails />
            <CarDetail carId={id} />
        </div>
    );
};

export default CarDetailsPage;
