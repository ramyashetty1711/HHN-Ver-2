import React, { useRef, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const FAQItem = ({ data, isActive, onClick }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (isActive && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [isActive]);

  return (
    <div className="border-b border-gray-300">
      <button
        onClick={onClick}
        className="w-full text-left px-4 py-3 !bg-white !font-semibold text-gray-800 hover:bg-gray-100 transition flex flex-row justify-between items-center border-2 border-gray-300"
        aria-expanded={isActive}
      >
        {data?.title ?? "Untitled"}
        <FaChevronDown
          className={`${
            isActive ? "rotate-[180deg]" : ""
          } transition-all duration-300`}
        />
      </button>

      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-all duration-300 ease-in-out px-6 text-md text-gray-500"
      >
        <div className="pb-4 space-y-3 pt-2 py-8">
          {/* Descriptions */}
          {data?.description && <p>{data.description}</p>}
          {data?.description1 && <p>{data.description1}</p>}
          {data?.description2 && <p>{data.description2}</p>}
          {data?.description3 && <p>{data.description3}</p>}

          {/* Download Link */}
          {data?.file && data?.downloadName && data?.linkText && (
            <a
              href={data.file} 
              download={`${data.downloadName.replace(/\s+/g, "_")}`} // Replace spaces with underscores in filename
              className="text-[var(--primary)] p-2 rounded-full transition"
            >
              {data.linkText}
            </a>
          )}

          {/* Aspect List */}
          {data?.aspectTitle && (
            <p className="font-semibold text-gray-800">{data.aspectTitle}</p>
          )}
          {data?.aspects?.length > 0 && (
            <ul className="list-disc list-inside ml-2 space-y-1">
              {data.aspects.map((item) => (
                <li key={item?.id}>{item?.aspect}</li>
              ))}
            </ul>
          )}

          {/* Table Rendering */}
          {data?.tableHeading?.[0] && data?.tableData?.length > 0 && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left border border-gray-300">
                <thead className="bg-gray-100 text-gray-800">
                  <tr>
                    <th className="p-2 border">
                      {data.tableHeading[0]?.title1}
                    </th>
                    <th className="p-2 border">
                      {data.tableHeading[0]?.title2}
                    </th>
                    <th className="p-2 border">
                      {data.tableHeading[0]?.title3}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.tableData.map((row, i) => (
                    <tr key={i} className="odd:bg-white even:bg-gray-50">
                      <td className="p-2 border">
                        {row?.availability || row?.availability1 || "-"}
                      </td>
                      <td className="p-2 border">
                        {row?.navIC || row?.navIC1 || "-"}
                      </td>
                      <td className="p-2 border">
                        {row?.gps || row?.gps1 || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
