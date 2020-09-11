start=$(date +%s%N)
echo $start

for f in /home/lfryett/src/RPT21/rpt-21-SDC-Abee/deliver-pickup/items100
do
sed -e 's/$/,/g' -e '$ s/,$//' $f > new_file && mv new_file $f
done

end=$(date +%s%N)
expired="$(($end-$start))"
echo $expired ns