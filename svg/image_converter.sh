#! /bin/bash
echo "Convertir todas las imagenes de una carpeta sin perder datos EXIF"
echo "Formato de entrada:"
read inputFormat
echo "Formato de salida:"
read outputFormat

#inkscape -w 32 -h 32 "$fileSource" --export-filename /run/media/angel/Datos/converted/"${fileSource%.*}.$outputFormat"

for fileSource in *.$inputFormat
do
	if [ -f "$fileSource" ]; then
		convert -background transparent "$fileSource" /run/media/angel/Datos/converted/"${fileSource%.*}.$outputFormat"
	else
		echo "no file $fileSource found!"
	fi
done
