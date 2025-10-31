import useData from "./useData";
interface WhyChooseUs {
  title: string;
  description: string;
}

const useWhyChooseUs = () => {
  return useData<WhyChooseUs[]>("/whychooseus");
};

export default useWhyChooseUs;
