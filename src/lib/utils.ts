import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Papa from 'papaparse';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate array of page number
 *
 * @param {Number} totalPages
 * @param {Number} page
 * @param {Number} rangeDisplayed
 * @returns Returns an array of rangeDisplayed (or less) page numbers, where a 0 in the returned array denotes a gap in the series.
 */
export const generateArrayOfPageNumber = (
  totalPages: number,
  page: number,
  rangeDisplayed: number,
  isMobile: boolean
) => {
  if (isMobile) {
    if (totalPages === 1) {
      return [page];
    } else if (totalPages === 2) {
      return [page, page + 1];
    } else {
      if (page === 1) {
        return [page, page + 1, page + 2];
      } else if (page === totalPages) {
        return [page - 2, page - 1, page];
      } else {
        return [page - 1, page, page + 1];
      }
    }
  } else {
    const range = (start: number, end: number) =>
      Array.from(Array(end - start + 1), (_, i) => i + start);
    let sideWidth = rangeDisplayed < 9 ? 1 : 2;
    let leftWidth = (rangeDisplayed - sideWidth * 2 - 3) >> 1;
    let rightWidth = (rangeDisplayed - sideWidth * 2 - 2) >> 1;

    if (totalPages <= rangeDisplayed) {
      return range(1, totalPages);
    }

    if (page <= rangeDisplayed - sideWidth - 1 - rightWidth) {
      return range(1, rangeDisplayed - sideWidth - 1).concat(
        0,
        range(totalPages - sideWidth + 1, totalPages)
      );
    }

    if (page >= totalPages - sideWidth - 1 - rightWidth) {
      return range(1, sideWidth).concat(
        0,
        range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
      );
    }

    return range(1, sideWidth).concat(
      0,
      range(page - leftWidth, page + rightWidth),
      0,
      range(totalPages - sideWidth + 1, totalPages)
    );
  }
};

/**
 *
 * Convert file to base64. base64 size will be different from original file size,
 * see [Encoded size increase](https://developer.mozilla.org/en-US/docs/Glossary/Base64#encoded_size_increase).
 *
 * @param file File
 * @returns string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
  });
};

export function getFileSize(size: number) {
  const fSExt = ['Bytes', 'KB', 'MB', 'GB'];
  let i = 0;
  console.log(size);
  while (size > 900) {
    size /= 1024;
    i++;
  }
  if (i > 1) {
    // If the size is in MB or GB
    return `${size.toFixed(size)} ${fSExt[i]}`;
  } else {
    // If the size is in Bytes or KB
    return `${size.toFixed(2)} ${fSExt[i]}`;
  }
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
export function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'iOS';
  }

  return 'unknown';
}

export const parseCSV = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result as string;

      // Normalize delimiters by replacing semicolons and pipes with commas
      const normalizedText = text.replace(/;|\|/g, ',');

      Papa.parse(normalizedText, {
        delimiter: ',', // Use comma after normalization
        header: true,
        complete: (results) => {
          console.log(results);
          resolve(results.data);
        },
        error: (error: any) => {
          console.log(error);
          reject(error);
        }
      });
    };

    reader.onerror = (error) => {
      console.log('File reading error:', error);
      reject(error);
    };

    reader.readAsText(file); // Read the file content as text
  });
};
