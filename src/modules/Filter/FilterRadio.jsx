export const FilterRadio = ({handleChangeType, data, type}) => {
  return (
    <>
      <input
        className="filter__radio"
        type="radio"
        name="type"
        id={data.value}
        value={data.value}
        checked={type === data.value}
        onChange={handleChangeType} 
      />
      <label
        className={`filter__label filter__label_${data.value}`}
        htmlFor={data.value}>
        {data.title}
      </label>
    </>
  )
};