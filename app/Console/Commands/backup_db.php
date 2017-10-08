<?php

namespace App\Console\Commands;
//buat format tanggal
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Process\Process;
class backup_db extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:database';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Backup Database To Storage';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //
        $date = Carbon::now()->format('Y-m-d_h_i');
        $user =env('DB_NAME');
        $password =env('DB_PASSWORD');
        $database =env('DB_DATABASE');
        $command ="mysqldump --user={$user} -p{$password} {$database} > {$date}.sql";
        $process = new Process($command);
        $process->start();
        while($process->isRunning()){
            Storage::put('gallery-app-db/' . $date . ".sql", 'public');
        }

    }
}
