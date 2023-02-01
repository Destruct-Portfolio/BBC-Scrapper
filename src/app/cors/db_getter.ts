import fs from "node:fs";

export class Json_getter {
  static outputpath = '../bank';


  public static async GetFile(date: string) {
    console.log(Json_getter.outputpath)
    let frr = fs.readFileSync(`${Json_getter.outputpath}/${date}.json`);
    let data = JSON.parse(frr.toString());
    return data;
  }


  public static GetMonthlyFile(month: string) {
    let Files = fs.readdirSync(`${Json_getter.outputpath}`)
    let FilesForMonth = Files.filter((item) => {
      return item.includes(month)
    })
    console.log(FilesForMonth)
    let J: any[] = []
    for (const file of FilesForMonth) {
      let frr = fs.readFileSync(`${Json_getter.outputpath}/${file}`);
      J.push(JSON.parse(frr.toString()));
    }
    return J
  }

  public static async GetLastWeek() {
    let date = new Date();
    let lastWeekDates = [];
    let options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    for (let i = 0; i < 7; i++) {
      try {
        date.setDate(date.getDate() - 1);
        //@ts-ignore
        let dateString = date.toLocaleDateString('en-US', options).replace(/ /g, '_').replace(/,/g, '');
        lastWeekDates.unshift(dateString);
      } catch (error: any) {
        console.log(error.status)
      }
    }
    /*   console.log(lastWeekDates) */
    let files: any = []


    await lastWeekDates.map((day) => {
      try {
        let t = fs.readFileSync(`${Json_getter.outputpath}/${day}.json`)
        files.push(JSON.parse(t.toString()))
      } catch (error: any) {
        console.log(error.message)
      }
    })
    return files

  }


  public static GetBy_NumberOfDays(StartFrom: string, numberOfDays: number) {
    let date = new Date(StartFrom.replace(/_/g, " "));
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    let days = []
    for (let i = 0; i < numberOfDays; i++) {
      let currentDate = new Date(date);
      //@ts-ignore
      currentDate.setDate(currentDate.getDate() + i);
      //@ts-ignore
      days.push(currentDate.toLocaleDateString("en-US", options).replace(/,/g, '').replace(/ /g, '_'));
    }
    console.log(days)
    let finalFile: any[] = []
    let Foundfiles = 0
    days.map((item) => {
      try {
        //@ts-ignore
        let t = JSON.parse(fs.readFileSync(`${Json_getter.outputpath}/${item}.json`))
        finalFile.push(t)
        Foundfiles++
      } catch (error) { }
    })

    return { finalFile, Foundfiles }
  }


}
