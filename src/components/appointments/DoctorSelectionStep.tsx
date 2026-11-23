
interface DoctorSelectionStepProps {
  selectedDentistId: string | null;
  onSelectDentist: (dentistId: string) => void;
  onContinue: () => void;
}


function DoctorSelectionStep({onContinue, onSelectDentist,selectedDentistId,}: DoctorSelectionStepProps) {
  return (
    <div>DoctorSelectionStep</div>
  )
}

export default DoctorSelectionStep